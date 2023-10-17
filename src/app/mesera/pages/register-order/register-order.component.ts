import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Dishes1 } from 'src/app/duenia/interfaces/dishes.interface';

@Component({
  selector: 'app-register-order',
  templateUrl: './register-order.component.html',
  styleUrls: ['./register-order.component.scss']
})
export class RegisterOrderComponent implements OnInit{

    routeItems: MenuItem[] = [];


    mesaNombre: string;
    constructor(private route: ActivatedRoute,
        private router: Router) {}
    ngOnInit(): void {

        // Recuperar el número de Plato de la URL
    this.route.params.subscribe(params => {
        this.mesaNombre = params['mesaNombre']; // El "+" convierte el parámetro en un número
      });
      this.routeItems = [
        { label: 'Platillos',routerLink:['/mesera/register-order',this.mesaNombre]},
        { label: 'Pagos',routerLink:['/mesera/payments',this.mesaNombre]},
    ];
    }

    menuDialog:boolean =false;


    // platos:string[] =['Plato 1','Plato 2','Plato 3','Plato 4','Plato 5','soy' ];

    platos: Dishes1[] = [
        {
          id: 1,
          nombrePlatillo: 'Chicharron',
          categoriaID: 'Categoria 1',
          precio: 10.99,
          esMenuDelDia: false
        },
        {
          id: 2,
          nombrePlatillo: 'Jalea',
          categoriaID: 'Categoria 2',
          precio: 12.99,
          esMenuDelDia: true
        },
        {
            id: 3,
            nombrePlatillo: 'Ozobuco',
            categoriaID: 'Categoria 2',
            precio: 12.99,
            esMenuDelDia: true
          },
          {
            id: 4,
            nombrePlatillo: 'Ceviche',
            categoriaID: 'Categoria 2',
            precio: 12.99,
            esMenuDelDia: true
          },
          {
            id: 5,
            nombrePlatillo: 'Arroz con Mariscos',
            categoriaID: 'Categoria 2',
            precio: 12.99,
            esMenuDelDia: true
          },
        // ... otros objetos de tipo Dishes1
      ];


    showDialog(){
        this.menuDialog=true;
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }






}
