import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MeseraService } from '../../../services/mesera.service';
import { EMenu } from '../../../interfaces/menuI.interface';

@Component({
    selector: 'platillos-component',
    templateUrl:'./platillos.component.html',
  styleUrls: ['./platillos.component.scss']

})

export class PlatillosComponentM implements OnInit {
    constructor(private meseraService:MeseraService) { }

    @Output() listaPlatillos = new EventEmitter<EMenu>();

    ngOnInit() {
        this.obtenerMenuSomee();
     }

    menuListSomee:EMenu[]=[];


    obtenerMenuSomee(){
        this.meseraService.obtenerMenuSomee("2024-04-23").subscribe((response:EMenu[])=>{
            this.menuListSomee = response;
        })
      }

      seleccionarPlatilloSomee(menu:EMenu){
        this.listaPlatillos.emit(menu);
      }
}
