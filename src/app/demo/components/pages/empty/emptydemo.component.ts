

    import { Component, OnInit } from '@angular/core';
import { Dishes } from 'src/app/demo/interfaces/dishe.interface';
import { DueniaService } from 'src/app/demo/service/duenia.service';
import { MessageService } from 'primeng/api';
import { JsonPipe } from '@angular/common';




@Component({
  selector: 'manage-dishes',
  templateUrl: './emptydemo.component.html',
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

nuevoPlato: Dishes = {
  id:'',
  nombre: '',
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


dishes!: Dishes[];


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


categorias: string[] = ['Arroces', 'Mariscos', 'Jalea'];
selectedOpcion!: string;


//Agregar Platillo
async addDishe(){
  const dishe = this.nuevoPlato;
  alert(JSON.stringify(dishe));
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
}


updatePlato: Dishes = {
  id:'',
  nombre: '',
  categoria: ''
};
async getOneDishe(dishe:Dishes){
  try{
    // await this.dueniaService.updateDishe();

    const response = await this.dueniaService.getOneDishe(dishe.id);

    this.updatePlato.id = response.id;
    this.updatePlato.nombre = response.nombre;
    this.updatePlato.categoria = response.categoria;

    this.visibleUpdate = true;
    this.productDialog = true;
  }
  catch(error){
    console.log(error);
  }
}

async updateDishe(){
  try{

    const dishe = this.updatePlato;
    alert(JSON.stringify(dishe));
    await this.dueniaService.updateDishe(dishe);
  }
  catch(error){
    console.log("No pude editarlo")
  }
  this.visibleUpdate = false;
  //Cargamos la lista
  this.loadDishes();
}


//Borrar Platillo
async deleteDishe(dishe: Dishes){
  if(window.confirm("Quieres Eliminarlo?")){
    try{
      await this.dueniaService.deleteDishe(dishe.id);
    }
    catch(error){
      console.log(error);
    }
  }
  //Cargamos la lista
  this.deleteProductDialog= true;
  this.loadDishes();
}

// ngOnInit(): void {
//   this.loadDishes();
// }


// ******************************************************







submitted: boolean = false;

cols: any[] = [];



rowsPerPageOptions = [5, 10, 20];

ngOnInit(): void {
  this.loadDishes();
}



}


