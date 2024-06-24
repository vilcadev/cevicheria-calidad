import { Component, OnInit } from '@angular/core';
import { DueniaService } from '../../services/duenia.service';
import { map } from 'rxjs';
import { EPlatillo, Platillo } from '../../interfaces/platillos.interface';
import { Dishes } from '../../interfaces/dishes.interface';
import { MenuI, MenuRequest, PlatilloRequest } from '../../interfaces/menu.interface';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';


@Component({
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss']
})
export class ManageMenuComponent implements OnInit{

    constructor(private dueniaService: DueniaService, private messageService: MessageService){

    }

    ngOnInit(): void {
        this.obtenerPlatillosSomee();
    }

    platillos: Platillo[]=[];

    menu: Platillo[] =[];

    cols:any;

    tableData:PlatilloRequest[]=[];

    filteredDishes: any[] = [];


    selectedDisheAdvanced: PlatilloRequest;

    // *************
    selectedPlatilloAdvanced: Dishes;
    platillosDetalle: Dishes[] =[];

    // Inicializa el objeto Menu con un array de Dishes
    menu2: MenuI;

    fechaSeleccionada: Date;


    validacionRealizada: boolean = false;
    guardar(){
        if(!this.fechaSeleccionada){
            Swal.fire(`Debe seleccionar un fecha`,'', 'warning');
            return;
        }
        if(this.tableData.length < 1){
          Swal.fire(`Debe registrar como mínimo un platillo`,'', 'warning');
          return;
        }

        if (!this.tableData.every(platillo => platillo.precioUnitario)) {
            Swal.fire(`Todos los platillos deben tener un precio definido`, '', 'warning');
            this.validacionRealizada = true;
            return;
        }

        Swal.fire('Procesando')
        Swal.showLoading()

        const fechaFormateada: string = format(this.fechaSeleccionada, "yyyy-MM-dd'T'HH:mm:ss.SSSX");

        const detalles: any[] = this.tableData.map((platillo: PlatilloRequest) => ({
            idPlatillo: platillo.idPlatillo,
            precioUnitario: platillo.precioUnitario,
        }))

        const data: MenuRequest = {
            fecha: fechaFormateada,
            platillo: detalles,
          };

          this.dueniaService.agregarMenuSommee(data).subscribe(
            (response) => {
              if (response.response.isSuccess) {
                Swal.close();
                Swal.fire(response.response.isSuccess,'', 'success');
                this.selectedDisheAdvanced=null;
                this.fechaSeleccionada = null;
                this.tableData=[];
                this.obtenerPlatillosSomee();
                return;
              }
            });

    }




    onDishSelect(platillo: any) {
        const platilloExistente = this.tableData.find(item => item.idPlatillo === platillo.idPlatillo);

        // Si no existe, agregar el platillo a tableData
        if (!platilloExistente) {
        this.tableData.push(platillo);
        return;
        }
        else{
            Swal.fire(`El platillo ya se encuentra en la lista`,'', 'warning');

        }
      }


      filterDishes(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.listaPlatillosSomme.length; i++) {
            const platillo = this.listaPlatillosSomme[i];
            if (platillo.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(platillo);
            }
        }

        this.filteredDishes = filtered;
    }


    quitarPlatillo(platilloId: string) {
        const index = this.tableData.findIndex(platillo => platillo.idPlatillo === platilloId);
        if (index !== -1) {
            this.tableData.splice(index, 1);
        }
    }


    // *******

    listaPlatillosSomme: EPlatillo[] = [];

    obtenerPlatillosSomee(){
        this.dueniaService.obtenerPlatillosSommee().subscribe((response) => {
            this.listaPlatillosSomme = response;
        });
    }

}
