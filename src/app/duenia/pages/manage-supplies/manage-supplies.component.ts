import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import Swal from 'sweetalert2';
import { Categoria } from '../../interfaces/categoria.interface';
import { DueniaService } from '../../services/duenia.service';

@Component({
  selector: 'app-manage-supplies',
  templateUrl: './manage-supplies.component.html',
  styleUrls: ['./manage-supplies.component.scss']
})
export class ManageSuppliesComponent {

    form!: FormGroup;
    productDialog: boolean = false;
    visible: boolean = false;
    isFormSubmitted = false;
    loading = false;

    ngOnInit(): void {
       this.obtenerCategorias();
    }

    constructor(
        private dueniaService: DueniaService,
        private messageService: MessageService,
        public fb: FormBuilder
    ) {
        this.form = this.fb.group({
            idCategoria:[''],
            nombreCategoria: ['', Validators.required],
        });
    }

    listaCategorias: Categoria[] = [];
    insumos:any[]=[];
    cols: any[] = [];

    showDialog() {
        this.visible = true;
    }


    obtenerCategorias() {
        // this.dueniaService.obtenerCategoriaSomee().subscribe((response) => {
        //     this.listaCategorias = response;

        // });

        this.insumos = [
            { id: 1, nombre: "Tomate", precio: 2.5, cantidad: 5, categoria: "Frutas y Verduras", unidad: "kg" },
            { id: 2, nombre: "Carne de res", precio: 12.75, cantidad: 3, categoria: "Carnes", unidad: "kg" },
            { id: 3, nombre: "Salmón", precio: 18.99, cantidad: 2, categoria: "Pescados y Mariscos", unidad: "kg" },
            { id: 4, nombre: "Leche", precio: 1.75, cantidad: 10, categoria: "Lácteos y Huevos", unidad: "litro" },
            { id: 5, nombre: "Arroz", precio: 0.99, cantidad: 8, categoria: "Granos y Cereales", unidad: "kg" }
          ];

          this.cities = [
            { label: 'Frutas y Verduras', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'Carnes', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'Pescados y Mariscos', value: { id: 3, name: 'London', code: 'LDN' } },
            { label: 'Lácteos y Huevos', value: { id: 4, name: 'Istanbul', code: 'IST' } },
            { label: 'Granos y Cereales', value: { id: 5, name: 'Paris', code: 'PRS' } }
        ];
    }



    agregarCategoriaSomee() {
        if (this.form.invalid) {
            this.isFormSubmitted = true;
            this.isTouched();
            return;
        }
        this.visible = false;
        Swal.fire('Procesando')
        Swal.showLoading()
        const formData = new FormData();
        formData.append(
            'nombre',
            this.form.get('nombreCategoria')?.value
        );

        this.dueniaService.agregarCategoriaSomee(formData).subscribe(
            (response) => {
                if(response.response.isSuccess){
                    Swal.close();
                    Swal.fire(response.response.isSuccess,'', 'success');
                    this.obtenerCategorias();
                    this.resetFormPlatillo();
                }
            });
    }


    editarCategoriaSomee(){
        if (this.form.invalid) {
            this.isFormSubmitted = true;
            this.isTouched();
            return;
        }
        this.productDialog = false;


        Swal.fire('Procesando')
        Swal.showLoading()

        const formData = new FormData();

        const idCategoria = this.form.get('idCategoria')?.value;

        formData.append(
            'nombre',
            this.form.get('nombreCategoria')?.value
        );

        this.dueniaService.actualizarCategoriaSomee(formData,idCategoria).subscribe(
            (message: string) => {
              Swal.close();
              Swal.fire(message,'', 'success');
              this.obtenerCategorias();
              this.resetFormPlatillo();
              // Realizar otras acciones si es necesario
            },
            error => {
                Swal.fire(error,'', 'warning');

            }
          );
    }


    eliminarPlatilloSomee(categoriaId:string){
        Swal.fire({
            title: '¿Estas seguro que deseas eliminar?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Procesando')
                Swal.showLoading()
                this.dueniaService.eliminarCategoriaSomee(categoriaId).subscribe(
                    (message: string) => {
                      Swal.close();

                      Swal.fire(message,'', 'success');
                      this.obtenerCategorias();

                      // Realizar otras acciones si es necesario
                    },
                    error => {
                        Swal.fire('Error al eliminar los datos, La categoría se encuentra vinculada a un producto','', 'warning');

                    }
                  );
            } else {
              return;
            }
          })
    }

    cargarPlatilloSomee(platillo:Categoria){
        this.productDialog=true;
        this.form.patchValue({
            idCategoria:platillo.idCategoria,
            nombreCategoria: platillo.nombre,
        })
    }

    resetFormPlatillo() {
        this.form.reset();
    }

    isRequerido(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control?.touched || control?.dirty);
    }

    isTouched() {
        Object.values(this.form.controls).forEach((control) => {
            control.markAsTouched();
        });
    }


    cities: SelectItem[] = [];
    selectedDrop: SelectItem = { value: '' };





}
