import { Component, OnInit } from '@angular/core';
import { DueniaService } from '../../services/duenia.service';
import { map } from 'rxjs';
import { Platillo } from '../../interfaces/platillos.interface';
import { Dishes } from '../../interfaces/dishes.interface';
import { MenuI } from '../../interfaces/menu.interface';
import { format } from 'date-fns';


@Component({
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss']
})
export class ManageMenuComponent implements OnInit{

    constructor(private dueniaService: DueniaService){

    }

    ngOnInit(): void {
        this.obtenerPlatillos();
    }

    platillos: Platillo[]=[];

    menu: Platillo[] =[];

    cols:any;

    tableData:Platillo[]=[];

    filteredDishes: any[] = [];


    selectedDisheAdvanced: Platillo;

    // *************
    selectedPlatilloAdvanced: Dishes;
    platillosDetalle: Dishes[] =[];

    // Inicializa el objeto Menu con un array de Dishes
    menu2: MenuI;

    fechaSeleccionada: Date;



    guardar(){
        const fechaFormateada: string = format(this.fechaSeleccionada, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
        // Obtén los detalles de los platillos desde tableData y los precios desde la interfaz
        const detalles: any[] = this.tableData.map((platillo: Platillo) => ({
            platilloId: platillo.id,
            price: platillo.precio || 0,
        }))

        const data: MenuI = {
            fecha: fechaFormateada, // Puedes ajustar esto según sea necesario
            detalles: detalles,
          };

        console.log({data})

        this.dueniaService.agregarMenu(data).subscribe(
            response =>{
                console.log('Menú agregado correctamente:', response);
            },
            error =>{
                console.error('Error al agregar el menú:', error);
            }
        )

    }




    onDishSelect(event: any) {
        // event es el objeto seleccionado, puedes acceder a sus propiedades según sea necesario
        // aquí estás asignando el objeto seleccionado a tableData como un arreglo
        console.log('tableData antes de la asignación:', this.selectedDisheAdvanced);
        // Asignar datos estáticos para probar
        this.tableData.push(this.selectedDisheAdvanced);

        console.log('tableData después de la asignación:', this.tableData);
      }


    obtenerPlatillos() {
        this.dueniaService.obtenerPlatillos().pipe(
          map((response: any) => response.data) // Extrae la lista de platillos de la respuesta
        ).subscribe({
          next: (data) => {
            this.platillos = data; // Asigna la lista completa de platillos
            console.log(this.platillos);
          },
          error: (e) => {
            console.error('Error al obtener platillos:', e);
          }
        });
      }

      filterDishes(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.platillos.length; i++) {
            const platillo = this.platillos[i];
            if (platillo.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(platillo);
            }
        }

        this.filteredDishes = filtered;
    }


    quitarPlatillo(platilloId: number) {
        const index = this.tableData.findIndex(platillo => platillo.id === platilloId);
        if (index !== -1) {
            this.tableData.splice(index, 1);
        }
    }

}
