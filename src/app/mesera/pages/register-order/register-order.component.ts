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
            this.meseraService.generatePDF(this.idMesa,this.platosList);
        }

    }

    routeItems: MenuItem[] = [];

    loading = false;


    idMesa: string;
    mesaObj:EMesa;
    constructor(private route: ActivatedRoute,
        private router: Router, private meseraService:MeseraService, private shareMeseraService:ShareMeseraService) {



        }
        mesaId: string;
    ngOnInit(): void {

        // Recuperar el número de Plato de la URL
    this.route.params.subscribe(params => {
        // this.idMesa = params['idMesa']; // El "+" convierte el parámetro en un número
        this.idMesa = params['idMesa']; // El "+" convierte el parámetro en un número
        console.log(this.idMesa)

      });
    //   const IdMesa = this.shareMeseraService.getMesaId();
    //   if(IdMesa ===undefined){
    //     this.meseraService.obtenerMesaInfoSomee(this.idMesa).subscribe((data:EMesa)=>{
    //         this.mesaObj =  data;
    //       });
    //   }
    //   else{
    //     this.meseraService.obtenerMesaInfoSomee(IdMesa).subscribe((data:EMesa)=>{
    //         this.mesaObj =  data;
    //       });
    //   }

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

     // Try to retrieve the stored array from localStorage based on mesaId
     const storedPlatosList = localStorage.getItem(`platosList_${this.idMesa}`);

     if (storedPlatosList) {
       // Parse the JSON string to get the array
       this.platosList = JSON.parse(storedPlatosList);
     }

     this.obtenerPlatillos();
     this.obtenerMenuSomee();
    }


    menuDialog:boolean =false;


    // platos:string[] =['Plato 1','Plato 2','Plato 3','Plato 4','Plato 5','soy' ];

    cols: any[] = [];


    platos2: any[] =[]
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


    menuList: MenuResponse | null = null;
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
          id:product.id,
          nombre: product.nombre,
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
              id: platillo.id,
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

      estado:string;

      guardarOrden(){
         // Save the updated array to localStorage
        // localStorage.setItem('platosList', JSON.stringify(this.platosList));

        // if(this.platosList.length === 0){
        //     alert('Ningún platillo encontrado para Guardar')
        // }
        // else{
        //      // Save the updated array to localStorage based on mesaId

        //     this.agregarOrdenH();
        // }
        this.agregarOrdenH();
      }
        obtenerFechaHoraFormateada(): string {
        const fechaHoraActual = new Date();

        // Formatear la fecha y hora en el formato deseado
        const fechaFormateada = `${fechaHoraActual.getFullYear()}-${(fechaHoraActual.getMonth() + 1).toString().padStart(2, '0')}-${fechaHoraActual.getDate().toString().padStart(2, '0')}`;
        const horaFormateada = `${fechaHoraActual.getHours().toString().padStart(2, '0')}:${fechaHoraActual.getMinutes().toString().padStart(2, '0')}`;

        // Combinar la fecha y hora formateadas
        return `${fechaFormateada} ${horaFormateada}`;
      }

      agregarOrden(){
        let idDetalleCounter = 1; // Contador para el idDetalle
        let totalAcumulado = 0; // Acumulador para el total

        // Obtener la fecha y hora formateada utilizando la función
        const fechaHoraFormateada = this.obtenerFechaHoraFormateada();

        // Construir el array de detalle_orden utilizando map
        const detalleOrden: DetalleOrden[] = this.platosList.map((platillo) => {
            totalAcumulado += platillo.precio;
            return {
                idDetalle: idDetalleCounter,
                idOrden: 3,  // Backend
                platillo: {
                  id: platillo.id, //Frontend
                  nombre: platillo.nombre,  //Frontend
                },
                cantidad: platillo.cantidad,  // Frontend
                total: platillo.precio,  // Frontend
                estado: 1,  // Frontend
            };
        });
        const nuevaOrden:Order ={
            id:3, // Backend
            idMesa:3, // Frontend
            fecha:fechaHoraFormateada, // Frontend
            idEstado:1, // Frontend
            MontoTotal:totalAcumulado, // Frontend
            detalle_orden:detalleOrden // Frontend
        }
        localStorage.setItem(`mesa_Status_${this.idMesa}`,nuevaOrden.idEstado.toString())
        this.meseraService.agregarOrden(nuevaOrden).subscribe(
            (response)=>{
                console.log("La orden se registro correctamente ",response);
            },
            (error) =>{
                console.log("Hubo un error al registrar la orden ",error);
            }
        )
        this.router.navigate(['/mesera/select-tables']);  // Ruta para la mesera
      }

      agregarOrdenH(){
        let totalAcumulado = 0; // Acumulador para el total

        const detallerOrdenH:DetallesH[] = this.platosList.map((platillo)=>{
            totalAcumulado += platillo.precio;
            return{
                platilloId: platillo.id,
                estadoId: 1,
                cantidad: platillo.cantidad,
                total: platillo.precio
            }
        });
        const fechaHoraActual = new Date();


        const nuevaOrdenH: OrderH ={
            fechaOrden: fechaHoraActual,
            total: totalAcumulado,
            mesaId: parseInt(this.idMesa.match(/\d+/)[0], 10),
            estadoId: 1,
            detalles: detallerOrdenH
        }
        console.log("dentro de registro:",this.mesaId);
        this.meseraService.agregarOrdenH(nuevaOrdenH).subscribe(
            (response)=>{
                console.log("La orden se registro correctamente ",response);
                localStorage.setItem(`mesa_Status_${this.idMesa}`,nuevaOrdenH.estadoId.toString());
                localStorage.setItem(`platosList_${this.idMesa}`, JSON.stringify(this.platosList));
            },
            (error) =>{
                console.log("Hubo un error al registrar la orden ",error);
            }
        )
        this.router.navigate(['/mesera/select-tables']);  // Ruta para la mesera
      }

    //   actualizarOrden(){
    //     this.meseraService.actualizarOrden().subscribe(

    //     )
    //   }



    //   ***************** OBTENER MENU DEL DIA

    //Funciona
    obtenerPlatillos() {
        this.meseraService.obtenerMenu().subscribe(
          (response: MenuResponse) => {
            this.menuList = response;

             // Verifica si hay datos antes de extraer
            if (this.menuList && this.menuList.data) {
                // Usa flatMap para aplanar la estructura y obtener un arreglo plano
                this.platos2 = this.menuList.data.flatMap((item: MenuData) =>
                item.menuDetalles.map((detalle) => ({
                    id: detalle.platillo.id,
                    nombre: detalle.platillo.nombre,
                    precio: detalle.precio,
                }))
                );
            }
            console.log("Debajo mio");
            console.log(this.platos2[0]);
            console.log(this.menuList);
            console.log(this.platos2);
          },
          (error) => {
            console.error('Error al obtener platillos:', error);
          }
        );
      }


    //   **************************************************************************************

    menuListSomee:EMenu[]=[];
    platillosList:EPlatilloM[]=[];
    cantidadesPlatillos:number[]=[];
    platillosView:boolean = true;
    pagosView:boolean = false;
    observacion:string='';
    total:number=0;



      obtenerMenuSomee(){
        this.meseraService.obtenerMenuSomee("2024-04-23").subscribe((response:EMenu[])=>{
            this.menuListSomee = response;
        })
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


    // aumentarCantidad(plato: platos) {
    //     plato.cantidad++;
    //     plato.precio = plato.precioUnitario * plato.cantidad;
    //   }

    //   disminuirCantidad(plato: platos) {
    //     if (plato.cantidad > 1) {
    //       plato.cantidad--;
    //     }
    //     plato.precio = plato.precioUnitario * plato.cantidad;
    //   }


      showPlatillosView(){
        this.platillosView = true;
        this.pagosView = false;
      }
      showPagosView(){
        this.pagosView = true;
        this.platillosView = false;
      }



      ordenClick(){
        console.log(this.observacion)
        const listaProductos: PlatilloRequest[]=[];

        if(this.platillosList.length<1){
            alert("no hay platillos en la orden");
        }



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

                    // TODO: REDIRECCIONAR A LAS MESAS
                    return;
                }
            });

      }

      formatearFecha(fecha:Date){
        const year = fecha.getFullYear();
        const month = fecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que necesitas agregar 1
        const day = fecha.getDate();

        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      }


}
