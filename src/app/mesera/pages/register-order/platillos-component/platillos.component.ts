import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MeseraService } from '../../../services/mesera.service';
import { EMenu } from '../../../interfaces/menuI.interface';
import { ECategoriasMenu } from 'src/app/mesera/interfaces/categorias.interface';

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

    ngOnInit() {
        this.obtenerMenuSomee();
        this.obtenerCategoriasMenuSomee();
     }

    menuListSomee:EMenu[]=[];


    obtenerMenuSomee(){
        this.selectedCategory = "Todos"
        this.meseraService.obtenerMenuSomee("2024-05-04").subscribe((response:EMenu[])=>{
            this.menuListSomee = response;
        })
      }

      seleccionarPlatilloSomee(menu:EMenu){
        this.listaPlatillos.emit(menu);
      }




    obtenerCategoriasMenuSomee(){
        this.meseraService.obtenerCategoriasMenuSomee("2024-05-04").subscribe((response:ECategoriasMenu[])=>{
            this.listaCategoriasMenu = response;
            console.log(this.listaCategoriasMenu);
        })
    }

    obtenerPlatillosPorCategoriaSomee(categoriaId:string, categoriaNombre:string){
        this.selectedCategory = categoriaNombre;
        this.meseraService.obtenerPlatillosPorCategoriaSomee("2024-05-04",categoriaId).subscribe((response:EMenu[])=>{
            this.menuListSomee = response;
        })
    }
}
