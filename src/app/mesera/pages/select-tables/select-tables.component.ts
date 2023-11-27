import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, map, startWith, switchMap, takeUntil } from 'rxjs';
import { OrderHCocinero } from 'src/app/cocinero/interfaces/orderHCocinero.interface';
import { CocineroService } from 'src/app/cocinero/services/cocinero.service';
import { MeseraService } from '../../services/mesera.service';

@Component({
  selector: 'app-select-tables',
  templateUrl: './select-tables.component.html',
  styleUrls: ['./select-tables.component.scss']
})
export class SelectTablesComponent implements OnInit{

    mesas:string[] =['Mesa 1','Mesa 2','Mesa 3','Mesa 4','Mesa 5','Mesa 6' ];

    ordenH: OrderHCocinero[];
    finishOrder:boolean =false;

    selectedTable: string;
    loading = false;

    constructor(private router: Router, private cocineroService: CocineroService,
        private meseraService: MeseraService){}

        private destroy$ = new Subject<void>(); // Para manejar la destrucción del componente
        private pollingInterval = 5000; // Intervalo de 3 segundos

    ngOnInit(): void {

        // Inicia el intervalo y ejecuta la función cada 3 segundos
     interval(this.pollingInterval)
     .pipe(
       startWith(0), // Para que se ejecute inmediatamente al inicio
       switchMap(() => this.cocineroService.obtenerOrdenesH()), // Realiza la llamada HTTP
       map((response: any) => response.data),
       takeUntil(this.destroy$) // Detiene el intervalo cuando el componente se destruye
     )
     .subscribe({
       next: (data) => {
         this.ordenH = data;
         console.log(this.ordenH);
       },
       error: (e) => {
         console.error('Error al obtener platillos:', e);
       },
     });
    }
    ngOnDestroy(): void {
        // Al destruir el componente, completa el observable y detiene el intervalo
        this.destroy$.next();
        this.destroy$.complete();
      }


    redirectToOrderPage(mesaNombre: string){
        this.router.navigate(['/mesera/register-order',mesaNombre]);
    }


    estadoMesa(mesaNombre: string): string {

        // TODO TRAER EL ESTADO DE LA MESA, OSEA HAZ UN GET DE ORDEN, Y SIEMPRE EN EL ON INIT
        // Recuperar el estado de localStorage
        const estadoMesa = localStorage.getItem(`mesa_Status_${mesaNombre}`);

        // Asegúrate de convertirlo a un número, ya que localStorage almacena todo como cadena
        const estadoMesaNumero = estadoMesa ? parseInt(estadoMesa, 10) : 0; // 0 es un valor predeterminado en caso de que no haya un estado guardado

        // Devolver una clase CSS basada en el estado
        switch (estadoMesaNumero) {
          case 1:
            return 'mesa-ocupada';
          case 3:
            return 'mesa-terminada';
          default:
            return ''; // Sin clase para mesas disponibles
        }
      }

      obtenerOrdenesH(){
        this.loading=true;
        this.cocineroService.obtenerOrdenesH().pipe(
                    map((response: any) => response.data) // Extrae la lista de platillos de la respuesta
                  ).subscribe({
                    next: (data) => {
                      this.ordenH = data; // Asigna la lista completa de platillos

                        // Recorre cada orden y establece el estado en el localStorage
                        this.ordenH.forEach((orden) => {
                            const mesaNombre = `mesa_Status_${orden.mesa.nombre}`;
                            const estadoMesaId = orden.estado.id;
                            localStorage.setItem(mesaNombre, estadoMesaId.toString());
                        });

                      console.log(this.ordenH);
                    //   localStorage.setItem(`mesa_Status_${this.ordenH.}`,nuevaOrden.idEstado.toString())
                    },
                    error: (e) => {
                      console.error('Error al obtener platillos:', e);
                    }
        });
        this.loading=false;
    }

    // Traerme el estado
    // establecer cada mesa_Status_ en el local storage con su estado,este estado esta en la orden.

    findOrderForMesa(mesaNombre: string): OrderHCocinero | undefined {
        return this.ordenH.find(order => order.mesa.nombre === mesaNombre);
      }

      deleteOrderForMesa(mesaNombre: string): void {
        this.finishOrder=false;
        event.stopPropagation();
        const orden = this.findOrderForMesa(mesaNombre);
        console.log({orden});
        if (orden) {
          const orderId = orden.id;

          // Aquí debes llamar a tu servicio HTTP DELETE
          this.meseraService.cancelarOrden(orderId).subscribe(
            (response) => {
              console.log(`Orden Eliminada`,response);
              // Puedes realizar acciones adicionales después de eliminar la orden si es necesario
            const mesaNombre = orden.mesa.nombre; // Reemplaza esto con el nombre de la mesa que estás tratando
            const key = `mesa_Status_${mesaNombre}`;
            const key2 = `platosList_${mesaNombre}`;


            // Elimina el elemento del localStorage
            localStorage.removeItem(key);
            localStorage.removeItem(key2);
            },
            (error) => {
              console.error('Error al eliminar la orden:',error);
            }
          );
        } else {
          console.error(`No se encontró una orden para la mesa ${mesaNombre}.`);
        }
      }


      cancelarOrden(mesa:string){
        this.selectedTable = mesa;
        event.stopPropagation();
        this.finishOrder=true;
        this.obtenerOrdenesH();
      }

}
