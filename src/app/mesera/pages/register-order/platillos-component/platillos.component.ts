import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MeseraService } from '../../../services/mesera.service';
import { EMenu } from '../../../interfaces/menuI.interface';
import { ECategoriasMenu } from 'src/app/mesera/interfaces/categorias.interface';
import Swal from 'sweetalert2';
import { envAzure } from 'src/config';

@Component({
    selector: 'platillos-component',
    templateUrl:'./platillos.component.html',
  styleUrls: ['./platillos.component.scss']

})

export class PlatillosComponentM implements OnInit {
    constructor(private meseraService:MeseraService) { }

    @Output() listaPlatillos = new EventEmitter<EMenu>();
    selectedCategory: string | null = 'Todos';

    listaCategoriasMenu: ECategoriasMenu[]=[];
    fechaSeleccionada: Date;
    enivonmentAzureImage ='';


    ngOnInit() {

        alert("Carga el menu con la fecha 05/24/2024")
        this.enivonmentAzureImage = envAzure.url;
        let fecha = localStorage.getItem('fechaMenu');

        if(fecha){
            const fechaNueva = new Date(fecha);
            fechaNueva.setDate(fechaNueva.getDate() + 1); // Sumar un día a la fecha
            this.fechaSeleccionada = fechaNueva;
        }
        else{
            console.log("entro")
            const date = new Date();
            this.fechaSeleccionada = date
        }


        this.obtenerMenuSomee();
        this.obtenerCategoriasMenuSomee();
     }

    menuListSomee:EMenu[]=[];

    formatearFechaUTC(fecha: Date): string {
        const year = fecha.getUTCFullYear();
        const month = ('0' + (fecha.getUTCMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getUTCDate()).slice(-2);

        return `${year}-${month}-${day}`;
      }

  formatearFechaLocal(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }


    obtenerMenuSomee(){
        this.selectedCategory = "Todos"
        if(this.fechaSeleccionada){

            const fecha = this.formatearFechaLocal(this.fechaSeleccionada);
            this.meseraService.obtenerMenuSomee(fecha).subscribe((response:EMenu[])=>{
                this.menuListSomee = response;

                if(this.menuListSomee.length<1){
                    Swal.showLoading();
                    Swal.close();
                    Swal.fire('No hay un menú registrado para la fecha','', 'warning');
                }

                localStorage.setItem('fechaMenu', this.formatearFechaUTC(this.fechaSeleccionada));
                this.obtenerCategoriasMenuSomee();

            })
        }
        else{
            Swal.showLoading();
            Swal.close();
            Swal.fire('Ninguna fecha ingresada','', 'warning');
        }
      }

      seleccionarPlatilloSomee(menu:EMenu){
        this.listaPlatillos.emit(menu);
      }




    obtenerCategoriasMenuSomee(){
        const fecha = this.formatearFechaUTC(this.fechaSeleccionada);
        this.meseraService.obtenerCategoriasMenuSomee(fecha).subscribe((response:ECategoriasMenu[])=>{
            this.listaCategoriasMenu = response;
            console.log(this.listaCategoriasMenu);
        })
    }

    obtenerPlatillosPorCategoriaSomee(categoriaId:string, categoriaNombre:string){
        this.selectedCategory = categoriaNombre;
        const fecha = this.formatearFechaUTC(this.fechaSeleccionada);

        console.log("hey",fecha)
        this.meseraService.obtenerPlatillosPorCategoriaSomee(fecha,categoriaId).subscribe((response:EMenu[])=>{
            this.menuListSomee = response;
        })
    }
}
