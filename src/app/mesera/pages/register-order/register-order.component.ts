import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Dishes1 } from 'src/app/duenia/interfaces/dishes.interface';
import { EPlatillo, platos } from '../../interfaces/platos.interface';


import { MeseraService } from '../../services/mesera.service';
import { map } from 'rxjs';
import { EMenu, MenuData, MenuResponse } from '../../interfaces/menuI.interface';
import { DetalleOrden, EPlatilloM, OrdenRequest, Order, PlatilloRequest } from '../../interfaces/order.interface';
import { DetallesH, OrderH } from '../../interfaces/orderH.interface';
import { ShareMeseraService } from '../../services/shareMesera.service';
import { EMesa } from '../../interfaces/mesa.interface';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { OrdenDetalle } from '../../interfaces/ordenDetalle.interface';



@Component({
  selector: 'app-register-order',
  templateUrl: './register-order.component.html',
  styleUrls: ['./register-order.component.scss']
})
export class RegisterOrderComponent implements OnInit{

    generarPDF(){
        if(this.platillosList.length === 0){
            alert('Ningún platillo encontrado para la Pre - cuenta')
        }
        else{
            this.meseraService.generatePDF(this.mesaObj.nombreMesa,this.platillosList, this.total);
        }

    }

    routeItems: MenuItem[] = [];

    loading = false;


    idMesa: string;
    mesaObj:EMesa;
    constructor(private route: ActivatedRoute,
        private router: Router, private meseraService:MeseraService, private shareMeseraService:ShareMeseraService, private location:Location) {



        }
        mesaId: string;
    ngOnInit(): void {

        // Recuperar el número de Plato de la URL
    this.route.params.subscribe(params => {
        this.idMesa = params['idMesa']; // El "+" convierte el parámetro en un número
        console.log(this.idMesa)

      });


    this.shareMeseraService.mesaId$.subscribe(id => {
        this.mesaId = id;
        this.meseraService.obtenerMesaInfoSomee(this.idMesa).subscribe((data:EMesa)=>{
            this.mesaObj =  data;
        });
    });


      this.routeItems = [
        { label: 'Platillos',routerLink:['/mesera/register-order',this.idMesa]},
        { label: 'Pagos',routerLink:['/mesera/payments',this.idMesa]},
    ];

     this.obtenerOrdenSomee();
    }


    menuDialog:boolean =false;


    // platos:string[] =['Plato 1','Plato 2','Plato 3','Plato 4','Plato 5','soy' ];

    cols: any[] = [];


    platos2: any[] =[]





    showDialog(){
        this.menuDialog=true;

    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }


    menuList: MenuResponse | null = null;
    // Lista de Platillos
     platosList: platos[] = [];


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
          id:product.id,
          nombre: product.nombre,
          cantidad: 1, // Empieza con una cantidad de 1
          precioUnitario: product.precio,
          precio:product.precio
        };
        this.selectedPlatillos.push(platilloSeleccionado);
      }




      //Pipe Seleccionados:
      public clientsMap = {
        '=0':'No hay nada Aquí',
        '=1': 'Ver 1 Seleccionado',
        '=2': 'Ver 2 Seleccionados',
        'other': 'Ver # Seleccionados'
      }

      estado:string;

      obtenerFechaHoraFormateada(): string {
        const fechaHoraActual = new Date();

        // Formatear la fecha y hora en el formato deseado
        const fechaFormateada = `${fechaHoraActual.getFullYear()}-${(fechaHoraActual.getMonth() + 1).toString().padStart(2, '0')}-${fechaHoraActual.getDate().toString().padStart(2, '0')}`;
        const horaFormateada = `${fechaHoraActual.getHours().toString().padStart(2, '0')}:${fechaHoraActual.getMinutes().toString().padStart(2, '0')}`;

        // Combinar la fecha y hora formateadas
        return `${fechaFormateada} ${horaFormateada}`;
      }

    //   **************************************************************************************

    menuListSomee:EMenu[]=[];
    platillosList:EPlatilloM[]=[];
    cantidadesPlatillos:number[]=[];
    platillosView:boolean = true;
    pagosView:boolean = false;
    observacion:string='';
    total:number=0;
    ordenDetalle:OrdenDetalle;




      obtenerOrdenSomee(){
        this.meseraService.obtenerOrdenSomee(this.mesaId || this.idMesa).subscribe((response:OrdenDetalle)=>{
            this.ordenDetalle = response;

            this.platillosList = this.ordenDetalle.platillos.map(detallePlatillo => {
                this.total += detallePlatillo.precioTotal

                return {
                    idPlatillo: detallePlatillo.idPlatillo,
                    // Aquí deberías obtener el nombre del platillo desde tu sistema
                    nombre: detallePlatillo.nombrePlatillo,
                    cantidad: detallePlatillo.cantidad,
                    precioUnitario: detallePlatillo.precioTotal / detallePlatillo.cantidad,
                    precioTotal: detallePlatillo.precioTotal
                };
            });
            this.observacion = this.ordenDetalle.observacion
        });
      }

      seleccionarPlatilloSomee(product: EMenu) {
        const platilloSeleccionado:EPlatilloM = {
          idPlatillo:product.idPlatillo,
          nombre: product.nombre,
          cantidad:1,
          precioUnitario: product.precioUnitario,
          precioTotal: product.precioUnitario,
        };
        const existePlatillo = this.platillosList.some(item => item.idPlatillo === platilloSeleccionado.idPlatillo);

        if (existePlatillo) {
           Swal.fire('El plato ya fue seleccionado','','warning')
           return;
        }
        this.platillosList.push(platilloSeleccionado);
        this.actualizarTotal();
      }

      quitarPlatilloSomee(platillo: EPlatilloM) {

        const index = this.platillosList.findIndex(item => item.idPlatillo === platillo.idPlatillo);
        if (index !== -1) {
            this.platillosList.splice(index, 1);
        }
        this.actualizarTotal();
      }
      sumarPlatillo(item:EPlatilloM){
        item.cantidad++;
        item.precioTotal = item.precioUnitario * item.cantidad;
        this.actualizarTotal();

      }
      restarPlatillo(item:EPlatilloM){

        if(item.cantidad > 1){
            item.cantidad--;
        }
        item.precioTotal = item.precioUnitario * item.cantidad;
        this.actualizarTotal();
      }

      actualizarTotal(){
        this.total=0;
       for (let i = 0; i < this.platillosList.length; i++) {
        this.total += this.platillosList[i].precioTotal
       }
      }

      onEnterKeyPressed(platillo: EPlatilloM, cantidadIngresada: string) {
        const cantidad = parseInt(cantidadIngresada, 10);

        if (!isNaN(cantidad) && cantidad >= 0) {
            // Actualiza la cantidad del platillo
            platillo.cantidad = cantidad;

            // Calcula el nuevo precio total
            platillo.precioTotal = platillo.precioUnitario * cantidad;

            // Aquí puedes realizar cualquier otra acción que necesites con el nuevo precio total
            console.log('Nuevo precio total:', platillo.precioTotal);
        }
        else{
            Swal.fire('El valor ingresado no es válido','','error')
        }
        this.actualizarTotal();
    }






      showPlatillosView(){
        this.platillosView = true;
        this.pagosView = false;
      }
      showPagosView(){
        this.pagosView = true;
        this.platillosView = false;
      }



      ordenClick(){
        const listaProductos: PlatilloRequest[]=[];

        if(this.platillosList.length<1){
            alert("no hay platillos en la orden");
            return;
        }
        Swal.fire('Procesando')
        Swal.showLoading()



        for (let i = 0; i < this.platillosList.length; i++) {

            listaProductos.push({
                idPlatillo: this.platillosList[i].idPlatillo,
                cantidad: this.platillosList[i].cantidad,
                precioTotal: this.platillosList[i].precioTotal,
            })

        }

        const ordenRequest:OrdenRequest ={
            fecha: this.formatearFecha(new Date),
            mesaId: this.mesaObj.idMesa,
            observacion: this.observacion,
            orden:listaProductos,
        }


        console.log(ordenRequest);

        this.meseraService.agregarOrdenSomee(ordenRequest).subscribe(
            (response) => {
                if(response.response.isSuccess){
                    Swal.close();
                    Swal.fire(response.response.isSuccess,'', 'success');
                    this.back();
                    return;
                }
              }

      )
    };

      formatearFecha(fecha:Date){
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11, por lo que necesitas agregar 1
        const day = fecha.getDate().toString().padStart(2, '0');
        const hours = fecha.getHours().toString().padStart(2, '0');
        const minutes = fecha.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
      }


  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
