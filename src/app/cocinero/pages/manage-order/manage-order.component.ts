import { Component, OnInit } from '@angular/core';


import { RootObject } from '../../interfaces/order.interface';
import { CocineroService } from '../../services/cocinero.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit{


  constructor(private cocineroService: CocineroService){}

  ngOnInit(): void {
    this.obtenerOrdenes();
  }

  cols: any[] = [];

  ordenes: RootObject []=[];



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

    
}
