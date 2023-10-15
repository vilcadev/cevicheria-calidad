import { Component, OnInit } from '@angular/core';
import { Dishes, Dishes1 } from '../../interfaces/dishes.interface';
import { DueniaService } from '../../services/duenia.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'manage-dishes',
  templateUrl: './manage-dishes.component.html',
  styleUrls: ['./manage-dishes.component.scss'],
  providers:[MessageService]
})
export class ManageDishesComponent implements OnInit{




  constructor(private dueniaService: DueniaService,
    private messageService: MessageService){}



//   public platos:Dishes[] = [{
//     nombre: 'arroz con chaufa',
//     categoria: 'arroces'
//   },
//   {
//     nombre: 'Lomo saltado',
//     categoria: 'Lomo'
//   }
// ];


async ngOnInit() {
  // this.getDishes1();
  // this.loadDishes();
  this.obtenerPlatillos();

  this.status = [
    { label: 'Habilitado', value: 'habilitado' },
    { label: 'Deshabilitado', value: 'deshabilitado' },
  ];




}

// getDishes1(){
//   this.dueniaService.getDishes2().pipe(
//     tap(data => {
//       this.dishes = data;
//       console.log('Datos de dishes:', data);
//     })
//   ).subscribe();
// }






nuevoPlato: Dishes = {
  id:'',
  nombre: '',
  status:'',
  categoria: ''
};

visible: boolean = false;
visibleUpdate: boolean = false;



// agregarPlato() {
//   if (this.nuevoPlato.nombre && this.nuevoPlato.categoria) {
//     this.platos.push({ ...this.nuevoPlato });
//     // Limpiar el formulario después de agregar el plato
//     this.nuevoPlato.nombre = '';
//     this.nuevoPlato.categoria = '';
//     this.visible = false;
//   }
// }

// Side bar
sidebarVisible: boolean = false;

productDialog: boolean = false;

deleteProductDialog:boolean = false;


dishes: Dishes[]=[];
dishes1: Dishes1[]=[];



statuses = [
  { label: 'INSTOCK', value: 'instock' },
  { label: 'LOWSTOCK', value: 'lowstock' },
  { label: 'OUTOFSTOCK', value: 'outofstock' }
];



showDialog() {
  this.visible = true;
}


//Cargar Platillos
public async loadDishes(){
  try{
    this.dishes = await this.dueniaService.getDishes();
  }
  catch(error){
    console.log(error);
  }
}


categorias: string[] = ['Arroces', 'Mariscos', 'Jaleas','Bebidas'];
status: any[] = ['Habilitado', 'Deshabilitado'];




selectedOpcion!: string;


//Agregar Platillo
async addDishe(){
  const dishe = this.nuevoPlato;
  // alert(JSON.stringify(dishe));
  try{
    await this.dueniaService.addDishe(dishe);
  }
  catch(error){
    console.log(error);
    alert("ups algo salio mal")
  }
  this.visible = false;

  //Limpiamos los campos
  this.nuevoPlato.nombre = '';
  this.nuevoPlato.categoria = '';
  //Cargamos la lista
  this.loadDishes();
  this.messageService.add({ severity: 'success', summary: 'Agregado ^_^', detail: 'Platillo Agregado', life: 3000 });
}



selectedPlato: Dishes = {
  id:'',
  nombre: '',
  status:'',
  categoria: ''
};
async getOneDishe(dishe:Dishes){
  try{
    // await this.dueniaService.updateDishe();
    const response = await this.dueniaService.getOneDishe(dishe.id);

    this.selectedPlato.id = response.id;
    this.selectedPlato.nombre = response.nombre;
    this.selectedPlato.status = response.status;
    this.selectedPlato.categoria = response.categoria;


    this.productDialog = true;

  }
  catch(error){
    console.log(error);
  }
}

async getOneDishetoDelete(dishe:Dishes){
  try{
    // await this.dueniaService.updateDishe();
    const response = await this.dueniaService.getOneDishe(dishe.id);

    this.selectedPlato.id = response.id;
    this.selectedPlato.nombre = response.nombre;
    this.selectedPlato.status = response.status;
    this.selectedPlato.categoria = response.categoria;

    this.deleteProductDialog=true;
  }
  catch(error){
    console.log(error);
  }
}



async updateDishe(){
  try{

    const dishe = this.selectedPlato;
    // alert(JSON.stringify(dishe));
    await this.dueniaService.updateDishe(dishe);
  }
  catch(error){
    console.log("No pude editarlo")
  }
  this.visibleUpdate = false;
  //Cargamos la lista
  this.loadDishes();
  this.messageService.add({ severity: 'info', summary: 'Editado ^_^', detail: 'Platillo Editado', life: 3000 });
}


//Borrar Platillo
async deleteDishe(dishe: Dishes){
  // alert(JSON.stringify(dishe));
    try{
      await this.dueniaService.deleteDishe(dishe.id);
    }
    catch(error){
      console.log(error);
    }
  //Cargamos la lista
  this.deleteProductDialog= false;
  this.loadDishes();
  this.messageService.add({ severity: 'error', summary: 'Eliminado ´_´', detail: 'Platillo Eliminado', life: 3000 });
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

//Funciona
obtenerPlatillos(){
  this.dueniaService.obtenerPlatillos().subscribe({
    next:(data)=>{
      this.dishes1 = data;
      console.log(JSON.stringify(data));
    },error:(e)=>{}

  });
}

//Agregar Platillo - no funca
async addDishe1(){
  const dishe1: Dishes1 = {
    nombrePlatillo: this.nuevoPlato1.nombrePlatillo,
    categoriaID: this.nuevoPlato1.categoriaID
  };
  // alert(JSON.stringify(dishe));
  try{
    alert(JSON.stringify(dishe1));
    await this.dueniaService.addDishe1(dishe1);
  }
  catch(error){
    console.log(error);
    alert("ups algo salio mal")
  }
  this.visible = false;

  //Limpiamos los campos
  this.nuevoPlato.nombre = '';
  this.nuevoPlato.categoria = '';
  //Cargamos la lista
  this.loadDishes();
  this.obtenerPlatillos();
  this.messageService.add({ severity: 'success', summary: 'Agregado ^_^', detail: 'Platillo Agregado', life: 3000 });
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

//Funciona
async deleteDishe1(dishe1: Dishes1){
try{
  if(dishe1.id!==undefined){
    await this.dueniaService.deleteDishe1(dishe1.id);
  }

    }
    catch(error){
      console.log(error);
    }
  //Cargamos la lista
  this.deleteProductDialog= false;
  this.loadDishes();
}



}
