import { Component, OnInit } from '@angular/core';
import { Dishes, Dishes1 } from '../../interfaces/dishes.interface';
import { DueniaService } from '../../services/duenia.service';
import { MessageService } from 'primeng/api';
import {  Platillo } from '../../interfaces/platillos.interface';
import { map } from 'rxjs';



@Component({
  selector: 'manage-dishes',
  templateUrl: './manage-dishes.component.html',
  styleUrls: ['./manage-dishes.component.scss'],
  providers:[MessageService]
})
export class ManageDishesComponent implements OnInit{

  constructor(private dueniaService: DueniaService,
    private messageService: MessageService){}

async ngOnInit() {
  this.obtenerPlatillos();
}

valSwitch: boolean = false;

visible: boolean = false;


// Side bar
sidebarVisible: boolean = false;

productDialog: boolean = false;

deleteProductDialog:boolean = false;


dishes: Dishes[]=[];
dishes1: Dishes1[]=[];

showDialog() {
  this.visible = true;
}

// ******************************************************

submitted: boolean = false;
cols: any[] = [];
rowsPerPageOptions = [5, 10, 20];

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

categoriasPlatillos:any = {
  1: 'Mariscos',
  4: 'Entradas',
  3: 'Bebidas',
  // Agrega más categorías según sea necesario
};

nuevoPlato1: Dishes1 = {
  id: 0,
  nombrePlatillo: '',
  categoriaID: '',
  esMenuDelDia: true,
  precio: 100
};

selectedPlato1: Dishes1 = {
  id: 0,
  nombrePlatillo: '',
  categoriaID: '',
  esMenuDelDia: true,
  precio: 100
};


platillos: Platillo[]=[];

// Inicializar un objeto de tipo Platillo
miPlatillo: Platillo = {
    id: 0,
    nombre: '',
    categoria: {
      id: 0,
      nombre: ''
    }
  };

//   miPlatillo: Platillo | null = null;


//Funciona
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

//Agregar Platillo - funciona
// addDishe1() {
//   const dishe1: Dishes1 = {
//     nombrePlatillo: this.nuevoPlato1.nombrePlatillo,
//     categoriaID: this.nuevoPlato1.categoriaID
//   };
//   this.dueniaService.addDishe1(dishe1).subscribe(
//     response => {
//       console.log('Platillo agregado correctamente:', response);
//       this.obtenerPlatillos();
//       // Resto del código para manejar la respuesta exitosa
//     },
//     error => {
//       console.error('Error al agregar platillo:', error);
//       // Resto del código para manejar el error
//     }
//   );
//   this.nuevoPlato1.nombrePlatillo ='';
//   this.nuevoPlato1.categoriaID = '';
//   this.visible = false;
// }


agregarPlatillo(){

    this.dueniaService.addDishe1(this.miPlatillo.nombre, this.miPlatillo.categoria.id).subscribe(
        response =>{
            console.log('Platillo agregado correctamente:', response);
            this.obtenerPlatillos();
        },
        error =>{
            console.error('Error al agregar platillo:', error);
        }
    );
    this.miPlatillo.nombre ='';
      this.miPlatillo.categoria.id = 0;
    this.visible = false;
}

getOneDishe1(dishe1:Dishes1){
    try{
        // await this.dueniaService.updateDishe();
        this.dueniaService.getOneDishe1(dishe1).subscribe({
          next:(data)=>{
            this.selectedPlato1.id = data.id;
            this.selectedPlato1.nombrePlatillo = data.nombrePlatillo;
            this.selectedPlato1.categoriaID = data.categoriaID;
            this.selectedPlato1.esMenuDelDia = data.esMenuDelDia;
            this.selectedPlato1.precio= data.precio;
          }
        });
        this.productDialog=true;
      }
      catch(error){
        console.log(error);
      }
  }

//Funciona
getOneDishetoDelete1(dishe1: Dishes1){
  try{
    // await this.dueniaService.updateDishe();
 this.dueniaService.getOneDishe1(dishe1).subscribe({
      next:(data)=>{
        this.selectedPlato1.id = data.id;
        this.selectedPlato1.nombrePlatillo = data.nombrePlatillo;
        this.selectedPlato1.esMenuDelDia = data.esMenuDelDia;
    this.selectedPlato1.precio= data.precio;
      }
    });
    this.deleteProductDialog=true;
  }
  catch(error){
    console.log(error);
  }
}

//funciona
 updateDishe1(){
    const dishe1 = this.selectedPlato1;
    // alert(JSON.stringify(dishe));
    this.dueniaService.updateDishe1(dishe1).subscribe(
        response =>{
            console.log("respuesta: ", response);
            this.obtenerPlatillos();
        },
        error =>{
            console.error("ups ocurrio un error", error);
        }
    );
    console.log('producto eliminado, ID:',dishe1.id);

    this.productDialog= false;
    this.messageService.add({ severity: 'info', summary: 'Editado ^_^', detail: 'Platillo Editado', life: 3000 });
  }

//Funciona
 deleteDishe1(dishe1: Dishes1){

  if(dishe1.id!==undefined){
     this.dueniaService.deleteDishe1(dishe1.id).subscribe(
        response =>{
            console.log("respuesta: ", response);
            this.obtenerPlatillos();
        },
        error =>{
            console.error("ups ocurrio un error", error);
        }

     );

  };
  console.log('producto eliminado, ID:',dishe1.id);
  this.deleteProductDialog= false;
  //Cargamos la lista
}
}
