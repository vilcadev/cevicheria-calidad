import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, map, startWith, switchMap, takeUntil,Subscription } from 'rxjs';
import { OrderHCocinero } from 'src/app/cocinero/interfaces/orderHCocinero.interface';
import { CocineroService } from 'src/app/cocinero/services/cocinero.service';
import { MeseraService } from '../../services/mesera.service';
import { MenuItem } from 'primeng/api';
import { EMesa } from '../../interfaces/mesa.interface';
import { ShareMeseraService } from '../../services/shareMesera.service';
import { Menu } from 'primeng/menu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-tables',
  templateUrl: './select-tables.component.html',
  styleUrls: ['./select-tables.component.scss']
})
export class SelectTablesComponent implements OnInit, OnDestroy{

    ordenH: OrderHCocinero[];
    finishOrder:boolean =false;

    selectedTable: string;
    loading = false;

    constructor(private router: Router, private cocineroService: CocineroService,
        private meseraService: MeseraService, private shareMesera:ShareMeseraService){}

        private destroy$ = new Subject<void>(); // Para manejar la destrucción del componente


    ngOnInit(): void {


    this.obtenerMesasSomee();
    this.getMesaAfterSeconds();
    }

    ngOnDestroy(): void {
        // Al destruir el componente, completa el observable y detiene el intervalo
        this.destroy$.next();
        this.destroy$.complete();


        //List mesas
         // Desuscribe la suscripción al intervalo si existe
         if (this.intervaloSubscription) {
            this.intervaloSubscription.unsubscribe();
          }

      }


    redirectToOrderPage(idMesa: string){
        this.router.navigate(['/mesera/register-order',idMesa]);
        this.shareMesera.setMesaId(idMesa);
    }



    eliminarOrden(mesaId:string){
        Swal.fire({
            title: '¿Estas seguro que deseas eliminar?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Procesando')
                Swal.showLoading()
                this.meseraService.eliminarOrden(mesaId).subscribe(
                    (message: string) => {
                      Swal.close();
                      Swal.fire(message,'', 'success');

                      // Realizar otras acciones si es necesario
                    },
                    error => {
                        Swal.fire(error, 'warning');

                    }
                  );
            } else {
              return;
            }
          })
    }

      listaMesas:EMesa[] =[];
    //   *************************************************************************
    private intervaloSubscription: Subscription | undefined;

    obtenerMesasSomee(){


        this.meseraService.obtenerMesasSomee().subscribe((response:EMesa[])=>{
            this.listaMesas = response;


            console.log(this.listaMesas);
        })
    }

    getMesaAfterSeconds() {
        const intervalo = interval(2000); // 2000 milisegundos = 2 segundos

        // Suscríbete al intervalo y llama a la función obtenerMesasSomee() cada vez que emita un valor
        this.intervaloSubscription = intervalo.subscribe(() => {
          this.obtenerMesasSomee();
        });
      }

    hla(){
        console.log("gdfg")
    }




}
