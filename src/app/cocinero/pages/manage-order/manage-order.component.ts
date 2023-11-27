import { Component, OnInit } from '@angular/core';


import { Datum, RootObject, DetalleOrden } from '../../interfaces/order.interface';
import { CocineroService } from '../../services/cocinero.service';
import { Subject, interval, map, startWith, switchMap, takeUntil } from 'rxjs';
import { Order } from 'src/app/mesera/interfaces/order.interface';
import { OrderHCocinero } from '../../interfaces/orderHCocinero.interface';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit{

    loading = false;
    finishOrder:boolean = false;

  constructor(private cocineroService: CocineroService){}

 public estado = false;

 private destroy$ = new Subject<void>(); // Para manejar la destrucción del componente
  private pollingInterval = 3000; // Intervalo de 3 segundos

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

  cols: any[] = [];

  ordenes: Datum []=[];

  ordenesJson:Order[] =[];

  ordenH:OrderHCocinero[] =[];

  miOrdenJson:Order;

    visible: boolean = false;

    miOrden: Datum = {
        detalleOrdenes: [
            {
                estadoPlatilloOrden: "",
                id: 0,
                menuDetalle: {
                    id: 0,
                    nombre: "",
                    precio: 0
                }
            },
            {
                estadoPlatilloOrden: "",
                id: 0,
                menuDetalle: {
                    id: 0,
                    nombre: "",
                    precio: 0
                }
            }
        ],
        fecha: "",
        id: 0,
        mesa: 4,
        ordenEstado: "",
        total: 0
    };


    obtenerOrdenesJson() {
        this.cocineroService.obtenerOrdenesJson().subscribe(
          (data: any) => {
            this.ordenesJson = data;
            console.log("Data traida correctamente");
            console.log(this.ordenesJson)
          },
          (error) => {
            console.error('Error al obtener platillos:', error);
          }
        );


      }




      ordenConDetalles:Order;
    obtenerOrdenConDetalles(idOrden: number): Order | null {
        this.visible = true;
        const ordenEncontrada = this.ordenesJson.find((orden) => orden.id === idOrden);

        if (ordenEncontrada) {
            // Clonar la orden para evitar modificar la referencia original
            this.ordenConDetalles = { ...ordenEncontrada };

            // Clonar y modificar cada detalle de orden
            this.ordenConDetalles.detalle_orden = this.ordenConDetalles.detalle_orden.map((detalle) => ({ ...detalle }));



            return this.ordenConDetalles;
        } else {
            console.error('No se encontró la orden correspondiente en this.ordenesJson');
            return null;
        }
    }

    obtenerOrdenesH(){
        this.loading=true;
        this.cocineroService.obtenerOrdenesH().pipe(
                    map((response: any) => response.data) // Extrae la lista de platillos de la respuesta
                  ).subscribe({
                    next: (data) => {
                      this.ordenH = data; // Asigna la lista completa de platillos
                      this.loading=false;
                      console.log(this.ordenH);
                    },
                    error: (e) => {
                      console.error('Error al obtener platillos:', e);
                    }
                  });
    }


    ordenSeleccionada: OrderHCocinero | null = null;

    obtenerOrdenConDetallesH(ordenId: number): void {
        this.visible = true;
    // Buscar la orden correspondiente en el array ordenH
    const orden = this.ordenH.find((o) => o.id === ordenId);

    if (orden) {
        // Asignar la orden seleccionada
        this.ordenSeleccionada = orden;
    } else {
        console.error('No se encontró la orden correspondiente');
    }
    }

    ordenEliminar: OrderHCocinero | null = null;
    obtenerOrdenEliminarH(ordenId:number):void{
        event.stopPropagation();
        this.finishOrder=true;
        // Buscar la orden correspondiente en el array ordenH
    const orden = this.ordenH.find((o) => o.id === ordenId);

    if (orden) {
        // Asignar la orden seleccionada
        this.ordenEliminar = orden;
    } else {
        console.error('No se encontró la orden correspondiente');
    }
    }

    // mostrarDetalleOrden(orden: number){
    //     const platillosCoincidente:Order[] = this.obtenerDetalle(orden)
    // }


    actualizarEstadoOrden(orderId:number, nuevoEstadoId:number){
        this.visible = false;
        this.loading=true;
        this.cocineroService.actualizarEstadoOrden(orderId,nuevoEstadoId).subscribe(
            (response) =>{
                console.log("Se actualizo correctamente la data",response);
            },
            (error) =>{
                console.log("Hubo un error al actualizar la orden",error);
            }
        )
        this.cocineroService.editarEstadoDetalles(orderId,nuevoEstadoId).subscribe(
            (response) =>{
                console.log("Se actualizo correctamente el detalle de la data",response);
                this.loading=false;
            },
            (error) =>{
                console.log("Hubo un error al actualizar el detalle de la data",error);
            }
        )
        this.obtenerOrdenesH();
    }

    terminarOrden(orderId:number, nuevoEstadoId:number){

        console.log({orderId,nuevoEstadoId})
        this.loading=true;
        this.finishOrder=false;
        this.cocineroService.actualizarEstadoOrden(orderId,nuevoEstadoId).subscribe(
            (response) =>{
                console.log("Se actualizo correctamente la data",response);
            },
            (error) =>{
                console.log("Hubo un error al actualizar la orden",error);
            }
        )
        this.cocineroService.editarEstadoDetalles(orderId,nuevoEstadoId).subscribe(
            (response) =>{
                console.log("Se actualizo correctamente el detalle de la data",response);
                this.loading=false;
                this.obtenerOrdenesH();
            },
            (error) =>{
                console.log("Hubo un error al actualizar el detalle de la data",error);
            }
        )
    }


}
