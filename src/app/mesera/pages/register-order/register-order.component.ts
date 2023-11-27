import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Dishes1 } from 'src/app/duenia/interfaces/dishes.interface';
import { platos } from '../../interfaces/platos.interface';


import { MeseraService } from '../../services/mesera.service';
import { map } from 'rxjs';
import { MenuData, MenuResponse } from '../../interfaces/menuI.interface';
import { DetalleOrden, Order } from '../../interfaces/order.interface';
import { DetallesH, OrderH } from '../../interfaces/orderH.interface';



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

     this.obtenerPlatillos();
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

        if(this.platosList.length === 0){
            alert('Ningún platillo encontrado para Guardar')
        }
        else{
             // Save the updated array to localStorage based on mesaId
            localStorage.setItem(`platosList_${this.mesaNombre}`, JSON.stringify(this.platosList));
            this.agregarOrdenH();

        }
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
        localStorage.setItem(`mesa_Status_${this.mesaNombre}`,nuevaOrden.idEstado.toString())
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

        const nuevaOrdenH: OrderH ={
            fechaOrden: "2023-11-26T22:57:24.931Z",
            total: totalAcumulado,
            mesaId: parseInt(this.mesaNombre.match(/\d+/)[0], 10),
            estadoId: 1,
            detalles: detallerOrdenH
        }
        localStorage.setItem(`mesa_Status_${this.mesaNombre}`,nuevaOrdenH.estadoId.toString());
        this.meseraService.agregarOrdenH(nuevaOrdenH).subscribe(
            (response)=>{
                console.log("La orden se registro correctamente ",response);
            },
            (error) =>{
                console.log("Hubo un error al registrar la orden ",error);
            }
        )
        this.router.navigate(['/mesera/select-tables']);  // Ruta para la mesera
      }



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

}
