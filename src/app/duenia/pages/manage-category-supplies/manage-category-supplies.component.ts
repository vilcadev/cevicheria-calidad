import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { Categoria } from '../../interfaces/categoria.interface';
import { DueniaService } from '../../services/duenia.service';

@Component({
  selector: 'app-manage-category-supplies',
  templateUrl: './manage-category-supplies.component.html',
  styleUrls: ['./manage-category-supplies.component.scss']
})
export class ManageCategorySuppliesComponent {

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
    cols: any[] = [];

    showDialog() {
        this.visible = true;
    }


    obtenerCategorias() {
        // this.dueniaService.obtenerCategoriaSomee().subscribe((response) => {
        //     this.listaCategorias = response;

        // });

        this.listaCategorias = [
            { idCategoria: "1", nombre: "Frutas y Verduras" },
            { idCategoria: "2", nombre: "Carnes" },
            { idCategoria: "3", nombre: "Pescados y Mariscos" },
            { idCategoria: "4", nombre: "Lácteos y Huevos" },
            { idCategoria: "5", nombre: "Granos y Cereales" },
            { idCategoria: "6", nombre: "Condimentos y Especias" },
            { idCategoria: "7", nombre: "Aceites y Vinagres" },
            { idCategoria: "8", nombre: "Bebidas" },
            { idCategoria: "9", nombre: "Productos de Panadería" },
            { idCategoria: "10", nombre: "Dulces y Postres" }
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

}
