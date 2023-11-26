import { Component, OnInit } from '@angular/core';


import { Datum, RootObject, DetalleOrden } from '../../interfaces/order.interface';
import { CocineroService } from '../../services/cocinero.service';
import { map } from 'rxjs';
import { Order } from 'src/app/mesera/interfaces/order.interface';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit{


  constructor(private cocineroService: CocineroService){}

 public estado = false;

  ngOnInit(): void {
    // this.obtenerOrdenes();
    this.obtenerOrdenesJson();

  }

  cols: any[] = [];

  ordenes: Datum []=[];

  ordenesJson:Order[] =[];

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



  obtenerOrdenes() {
      this.cocineroService.obtenerOrdenes().pipe(
        map((response: any) => response.data) // Extrae la lista de platillos de la respuesta
      ).subscribe({
        next: (data) => {
          this.ordenes = data; // Asigna la lista completa de platillos
          console.log(this.ordenes);
        },
        error: (e) => {
          console.error('Error al obtener platillos:', e);
        }
      });
    }

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


    // obtenerDetalle(orden: Datum){
    //     this.visible = true;

    //     // Encuentra la orden correspondiente en this.ordenes
    //     const ordenEncontrada = this.ordenesJson.find(o => o. === orden.id);

    //     if (ordenEncontrada) {
    //         // Asigna los detalles de la orden encontrada a miOrden
    //         this.miOrden.detalleOrdenes = ordenEncontrada.detalle_orden;
    //         this.miOrdenJson.fecha = ordenEncontrada.fecha;
    //         this.miOrden.id = ordenEncontrada.id;
    //         this.miOrden.mesa = ordenEncontrada.mesa;
    //         this.miOrden.ordenEstado = ordenEncontrada.ordenEstado;
    //         this.miOrden.total = ordenEncontrada.total;

    //         console.log('Detalles de la orden asignados a miOrden:', this.miOrden);
    //     } else {
    //         console.error('No se encontró la orden correspondiente en this.ordenes');
    //     }
    // }


}
