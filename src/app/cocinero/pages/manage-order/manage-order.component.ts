import { Component, OnDestroy, OnInit } from '@angular/core';


import { Datum, RootObject, DetalleOrden } from '../../interfaces/order.interface';
import { CocineroService } from '../../services/cocinero.service';
import { Subject, Subscription, interval, map, startWith, switchMap, takeUntil } from 'rxjs';
import { Order } from 'src/app/mesera/interfaces/order.interface';
import { EOrderRegistrada, EOrderRegistradaDetalle, OrderHCocinero } from '../../interfaces/orderHCocinero.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit, OnDestroy{

    loading = false;
    finishOrder:boolean = false;
    cols: any[] = [];
    visible: boolean = false;

  constructor(private cocineroService: CocineroService){}

 private destroy$ = new Subject<void>(); // Para manejar la destrucción del componente

  ngOnInit(): void {
    this.obtenerOrdenesSomee();
    // this.getMesaOrdenAfterSeconds();
  }

  ngOnDestroy(): void {
    // Al destruir el componente, completa el observable y detiene el intervalo
    this.destroy$.next();
    this.destroy$.complete();

    if (this.intervaloSubscription) {
        this.intervaloSubscription.unsubscribe();
      }
  }

     //**************************************************************** */

     listaOrdenesSomee:EOrderRegistrada[] =[];
     listaOrdenDetalleSomee:EOrderRegistradaDetalle;

     obtenerOrdenesSomee(){
         this.cocineroService.obtenerOrdenesRegistradasSomee().subscribe((response:EOrderRegistrada[])=>{
             this.listaOrdenesSomee = response;
             console.log(this.listaOrdenesSomee);
         })
     }


     obtenerDetalleOrdenSomee(mesaId:string){
        this.visible = true;
        this.cocineroService.obtenerDetallerOrdenRegistradaSomee(mesaId).subscribe((response:EOrderRegistradaDetalle)=>{
            this.listaOrdenDetalleSomee = response;
            console.log(this.listaOrdenDetalleSomee)
        })
     }

     actualizarEstadoOrdenSomee(idOrden:string, estadoOrden:number){
        this.visible = false;
        Swal.fire('Procesando')
        Swal.showLoading()
        return this.cocineroService.actualizarOrdenRegistradaSomee(idOrden, estadoOrden).subscribe(
            (message: string) => {
              Swal.close();
              Swal.fire(message,'', 'success');
              this.obtenerOrdenesSomee();
              // Realizar otras acciones si es necesario
            },
            error => {
                Swal.fire(error,'', 'warning');

            }
          );
     }

     private intervaloSubscription: Subscription | undefined;

     getMesaOrdenAfterSeconds() {
        const intervalo = interval(2000); // 2000 milisegundos = 2 segundos

        // Suscríbete al intervalo y llama a la función obtenerMesasSomee() cada vez que emita un valor
        this.intervaloSubscription = intervalo.subscribe(() => {
          this.obtenerOrdenesSomee();
        });
      }



}
