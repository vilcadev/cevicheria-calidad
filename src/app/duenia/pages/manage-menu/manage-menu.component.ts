import { Component, OnInit } from '@angular/core';
import { DueniaService } from '../../services/duenia.service';
import { map } from 'rxjs';
import { Platillo } from '../../interfaces/platillos.interface';
import { Menu } from 'primeng/menu';

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


    selectedCountryAdvanced: Platillo;


    onDishSelect(event: any) {
        // event es el objeto seleccionado, puedes acceder a sus propiedades según sea necesario
        // aquí estás asignando el objeto seleccionado a tableData como un arreglo
        console.log('tableData antes de la asignación:', this.selectedCountryAdvanced);
        // Asignar datos estáticos para probar
        this.tableData.push(this.selectedCountryAdvanced);
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

      filterCountry(event: any) {
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

}
