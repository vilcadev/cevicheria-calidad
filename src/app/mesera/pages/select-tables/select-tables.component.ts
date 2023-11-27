import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-tables',
  templateUrl: './select-tables.component.html',
  styleUrls: ['./select-tables.component.scss']
})
export class SelectTablesComponent implements OnInit{

    mesas:string[] =['Mesa 1','Mesa 2','Mesa 3','Mesa 4','Mesa 5','Mesa 6' ];



    constructor(private router: Router){}

    ngOnInit(): void {

    }


    redirectToOrderPage(mesaNombre: string){
        this.router.navigate(['/mesera/register-order',mesaNombre]);
    }


    estadoMesa(mesaNombre: string): string {
        // Recuperar el estado de localStorage
        const estadoMesa = localStorage.getItem(`mesa_Status_${mesaNombre}`);

        // Asegúrate de convertirlo a un número, ya que localStorage almacena todo como cadena
        const estadoMesaNumero = estadoMesa ? parseInt(estadoMesa, 10) : 0; // 0 es un valor predeterminado en caso de que no haya un estado guardado

        // Devolver una clase CSS basada en el estado
        switch (estadoMesaNumero) {
          case 1:
            return 'mesa-ocupada';
          case 2:
            return 'mesa-En Preparación';
          default:
            return ''; // Sin clase para mesas disponibles
        }
      }

}
