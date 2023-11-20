import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Dishes1 } from 'src/app/duenia/interfaces/dishes.interface';
import { platos } from '../../interfaces/platos.interface';


import { MeseraService } from '../../services/mesera.service';



@Component({
  selector: 'app-register-order',
  templateUrl: './register-order.component.html',
  styleUrls: ['./register-order.component.scss']
})
export class RegisterOrderComponent implements OnInit{

    generarPDF(){
        if(this.platosList.length === 0){
            alert('Ningún platillo encontrado para la Pre - cuenta')
        }
        else{
            this.meseraService.generatePDF(this.mesaNombre,this.platosList);
        }

    }

    routeItems: MenuItem[] = [];


    mesaNombre: string;
    constructor(private route: ActivatedRoute,
        private router: Router, private meseraService:MeseraService) { }
    ngOnInit(): void {

        // Recuperar el número de Plato de la URL
    this.route.params.subscribe(params => {
        this.mesaNombre = params['mesaNombre']; // El "+" convierte el parámetro en un número
      });
      this.routeItems = [
        { label: 'Platillos',routerLink:['/mesera/register-order',this.mesaNombre]},
        { label: 'Pagos',routerLink:['/mesera/payments',this.mesaNombre]},
    ];

     // Try to retrieve the stored array from localStorage based on mesaId
     const storedPlatosList = localStorage.getItem(`platosList_${this.mesaNombre}`);

     if (storedPlatosList) {
       // Parse the JSON string to get the array
       this.platosList = JSON.parse(storedPlatosList);
     }
    }


    menuDialog:boolean =false;


    // platos:string[] =['Plato 1','Plato 2','Plato 3','Plato 4','Plato 5','soy' ];

    cols: any[] = [];


    //Platillos
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



    // Lista de Platillos
     platosList: platos[] = [];

    // nuevoId = 1; // Inicializa un contador para los IDs únicos
    // agregarPlato(nombre: string, precioUnitario: number) {
    //   const nuevoPlato: platos = {
    //     id:this.nuevoId++,
    //     nombre: nombre,
    //     cantidad: 1,
    //     precioUnitario: precioUnitario
    //   };
    //   this.platosList.push(nuevoPlato);
    // }

    aumentarCantidad(plato: platos) {
      plato.cantidad++;
      plato.precio = plato.precioUnitario * plato.cantidad;
    }

    disminuirCantidad(plato: platos) {
      if (plato.cantidad > 1) {
        plato.cantidad--;
      }
      plato.precio = plato.precioUnitario * plato.cantidad;
    }

    eliminarPlato(id: number) {
        const index = this.platosList.findIndex(plato => plato.id === id);
        if (index !== -1) {
          this.platosList.splice(index, 1);
        }
      }






      //FUNCIONALIDAD BUSCAR PLATILLOS******************************************

      selectedPlatillos: any[] = [];

      seleccionarPlato(product: any) {
        const platilloSeleccionado = {
          nombre: product.nombrePlatillo,
          cantidad: 1, // Empieza con una cantidad de 1
          precioUnitario: product.precio,
          precio:product.precio
        };
        this.selectedPlatillos.push(platilloSeleccionado);
      }

      transferirPlatillos() {
        let precio = 0;
        // Iterar sobre los platillos seleccionados
        for (const platillo of this.selectedPlatillos) {

          // Verificar si el producto ya existe en platosList
          const productoExistente = this.platosList.find(p => p.nombre === platillo.nombre);

          if (productoExistente) {
            // Si el producto ya existe, aumentar la cantidad en lugar de agregarlo de nuevo
            productoExistente.cantidad += platillo.cantidad;

            // Precio = Precio Unitario * Cantidad
            productoExistente.precio = platillo.precioUnitario * productoExistente.cantidad;
          } else {
            // Si el producto no existe, agregarlo a platosList
            const nuevoId = this.platosList.length + 1;
            const nuevoPlatillo: platos = {
              id: nuevoId,
              nombre: platillo.nombre,
              cantidad: platillo.cantidad,
              precioUnitario: platillo.precioUnitario,
              precio: platillo.precio
            };
            this.platosList.push(nuevoPlatillo);
          }
        }
        // Resetear el array temporal de platillos seleccionados
        this.selectedPlatillos = [];



         // Cerrar el modal
        this.menuDialog = false;
      }


      //Pipe Seleccionados:
      public clientsMap = {
        '=0':'No hay nada Aquí',
        '=1': 'Ver 1 Seleccionado',
        '=2': 'Ver 2 Seleccionados',
        'other': 'Ver # Seleccionados'
      }

      guardarOrden(){
         // Save the updated array to localStorage
        localStorage.setItem('platosList', JSON.stringify(this.platosList));

        // Save the updated array to localStorage based on mesaId
        localStorage.setItem(`platosList_${this.mesaNombre}`, JSON.stringify(this.platosList));
      }

}
