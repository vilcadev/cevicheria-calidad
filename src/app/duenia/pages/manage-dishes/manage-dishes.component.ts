import { Component, OnInit } from '@angular/core';
import { Dishes, Dishes1 } from '../../interfaces/dishes.interface';
import { DueniaService } from '../../services/duenia.service';
import { MessageService } from 'primeng/api';
import { EPlatillo, Platillo } from '../../interfaces/platillos.interface';
import { map } from 'rxjs';
import { Categoria } from '../../interfaces/categoria.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'manage-dishes',
    templateUrl: './manage-dishes.component.html',
    styleUrls: ['./manage-dishes.component.scss'],
    providers: [MessageService],
})
export class ManageDishesComponent implements OnInit {
    form!: FormGroup;
    isFormSubmitted = false;

    constructor(
        private dueniaService: DueniaService,
        private messageService: MessageService,
        public fb: FormBuilder
    ) {
        this.form = this.fb.group({
            platilloId:[''],
            nombrePlatillo: ['', Validators.required],
            categoriaPlatillo: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.obtenerPlatillos();
        this.obtenerCategorias();
        this.obtenerPlatillosSomee();
    }

    valSwitch: boolean = false;

    visible: boolean = false;

    loading = false;

    // Side bar
    sidebarVisible: boolean = false;

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    dishes: Dishes[] = [];
    dishes1: Dishes1[] = [];

    showDialog() {
        this.visible = true;
    }

    // ******************************************************

    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    categoriasPlatillos: any = {
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
        precio: 100,
    };

    selectedPlato1: Dishes1 = {
        id: 0,
        nombrePlatillo: '',
        categoriaID: '',
        esMenuDelDia: true,
        precio: 100,
    };

    platillos: Platillo[] = [];

    // Inicializar un objeto de tipo Platillo
    miPlatillo: Platillo = {
        id: 0,
        nombre: '',
        categoria: {
            id: 0,
            nombre: '',
        },
    };

    loadPlatillo: Platillo = {
        id: 0,
        nombre: '',
        categoria: {
            id: 0,
            nombre: '',
        },
    };

    loadDeletePlatillo: Platillo = {
        id: 0,
        nombre: '',
        categoria: {
            id: 0,
            nombre: '',
        },
    };

    //   miPlatillo: Platillo | null = null;

    //Funciona
    obtenerPlatillos() {
        this.loading = true;
        this.dueniaService
            .obtenerPlatillos()
            .pipe(
                map((response: any) => response.data) // Extrae la lista de platillos de la respuesta
            )
            .subscribe({
                next: (data) => {
                    this.platillos = data; // Asigna la lista completa de platillos
                },
                error: (e) => {
                    console.error('Error al obtener platillos:', e);
                },
            });
        this.loading = false;
    }

    agregarPlatillo() {
        this.visible = false;
        this.loading = true;
        this.dueniaService
            .agregarPlatillo(
                this.miPlatillo.nombre,
                this.miPlatillo.categoria.id
            )
            .subscribe(
                (response) => {
                    this.obtenerPlatillos();
                    this.miPlatillo.nombre = '';
                    this.miPlatillo.categoria.id = 0;

                    this.loading = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Agregado',
                        detail: 'Platillo Agregado',
                        life: 3000,
                    });
                },
                (error) => {
                    console.error('Error al agregar platillo:', error);
                }
            );
    }

    cargarPlatillo(data: Platillo) {
        this.productDialog = true;
        this.loadPlatillo.id = data.id;
        this.loadPlatillo.nombre = data.nombre;
        this.loadPlatillo.categoria.id = data.categoria.id;
    }

    cargarIDBorrar(data: Platillo) {
        this.deleteProductDialog = true;
        this.loadDeletePlatillo.id = data.id;
        this.loadDeletePlatillo.nombre = data.nombre;
    }

    actualizarPlatillo(data: Platillo) {
        this.productDialog = false;
        this.loading = true;
        this.dueniaService.actualizarPlatillo(data).subscribe(
            (response) => {
                this.obtenerPlatillos();
                this.loading = false;
                this.messageService.add({
                    severity: 'info',
                    summary: 'Editado',
                    detail: 'Platillo Editado',
                    life: 3000,
                });
            },
            (error) => {
                console.error('Error al actualizar platillo:', error);
            }
        );
    }

    eliminarPLatillo(data: Platillo) {
        this.deleteProductDialog = false;
        this.loading = true;
        this.dueniaService.eliminarPlatillo(data.id).subscribe(
            (response) => {
                this.obtenerPlatillos();
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Eliminado',
                    detail: 'Platillo Eliminado',
                    life: 3000,
                });
            },
            (error) => {
                console.error('Error al eliminar platillo:', error);
                this.messageService.add({
                    severity: 'warn',
                    summary: '',
                    detail: 'No puede eliminar este Platillo',
                    life: 3000,
                });
            }
        );
    }

    getOneDishe1(dishe1: Dishes1) {
        try {
            // await this.dueniaService.updateDishe();
            this.dueniaService.getOneDishe1(dishe1).subscribe({
                next: (data) => {
                    this.selectedPlato1.id = data.id;
                    this.selectedPlato1.nombrePlatillo = data.nombrePlatillo;
                    this.selectedPlato1.categoriaID = data.categoriaID;
                    this.selectedPlato1.esMenuDelDia = data.esMenuDelDia;
                    this.selectedPlato1.precio = data.precio;
                },
            });
            this.productDialog = true;
        } catch (error) {
            console.log(error);
        }
    }

    //Funciona
    getOneDishetoDelete1(dishe1: Dishes1) {
        try {
            // await this.dueniaService.updateDishe();
            this.dueniaService.getOneDishe1(dishe1).subscribe({
                next: (data) => {
                    this.selectedPlato1.id = data.id;
                    this.selectedPlato1.nombrePlatillo = data.nombrePlatillo;
                    this.selectedPlato1.esMenuDelDia = data.esMenuDelDia;
                    this.selectedPlato1.precio = data.precio;
                },
            });
            this.deleteProductDialog = true;
        } catch (error) {
            console.log(error);
        }
    }

    //funciona
    updateDishe1() {
        const dishe1 = this.selectedPlato1;
        // alert(JSON.stringify(dishe));
        this.dueniaService.updateDishe1(dishe1).subscribe(
            (response) => {
                console.log('respuesta: ', response);
                this.obtenerPlatillos();
            },
            (error) => {
                console.error('ups ocurrio un error', error);
            }
        );
        console.log('producto eliminado, ID:', dishe1.id);

        this.productDialog = false;
        this.messageService.add({
            severity: 'info',
            summary: 'Editado ^_^',
            detail: 'Platillo Editado',
            life: 3000,
        });
    }

    //Funciona
    deleteDishe1(dishe1: Dishes1) {
        if (dishe1.id !== undefined) {
            this.dueniaService.deleteDishe1(dishe1.id).subscribe(
                (response) => {
                    console.log('respuesta: ', response);
                    this.obtenerPlatillos();
                },
                (error) => {
                    console.error('ups ocurrio un error', error);
                }
            );
        }
        console.log('producto eliminado, ID:', dishe1.id);
        this.deleteProductDialog = false;
        //Cargamos la lista
    }

    //*********************************************************************/
    files: File[] = [];
    disableZone: boolean = false;

    onSelect(event: any) {
        console.log(event);
        if (this.files.length < 1) {
            this.files.push(...event.addedFiles);
            this.disableZone = true;
        } else {
            console.log('mas de uno');
        }
    }

    onRemove(event: any) {
        this.files.splice(this.files.indexOf(event), 1);
        this.disableZone = false;
    }

    listaCategorias: any[] = [];
    listaPlatillosSomme: EPlatillo[] = [];
    selectCategoria: any;

    obtenerCategorias() {
        this.dueniaService.obtenerCategoriaSomee().subscribe((response) => {
            this.listaCategorias = response.map((categoria) => ({
                label: categoria.nombre,
                value: categoria.idCategoria,
            }));
        });
    }

    obtenerPlatillosSomee() {
        this.dueniaService.obtenerPlatillosSommee().subscribe((response) => {
            this.listaPlatillosSomme = response;
        });
    }

    agregarProductoSomme() {
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
            'Nombre',
            this.form.get('nombrePlatillo')?.value
        );
        const dd = this.form.get('categoriaPlatillo')?.value;
        formData.append(
            'CategoriaId',
            dd
        );
        formData.append(
            'ImagenUrl', 'htttp://cloudinary'
        )

        this.dueniaService.agregarPlatillosSommee(formData).subscribe(
            (response) => {
                if(response.response.isSuccess){
                    Swal.close();
                    Swal.fire(response.response.isSuccess,'', 'success');
                    this.obtenerPlatillosSomee();
                    this.resetForm();
                    return;
                }
            });
    }

    cargarPlatilloSomee(platillo:EPlatillo){
        this.productDialog=true;
        this.form.patchValue({
            platilloId:platillo.idPlatillo,
            nombrePlatillo: platillo.nombre,
            categoriaPlatillo: platillo.categoriaId
        })
    }

    editarPlatilloSomee(){
        if (this.form.invalid) {
            this.isFormSubmitted = true;
            this.isTouched();
            return;
        }
        this.productDialog = false;

        Swal.fire('Procesando')
        Swal.showLoading()

        const formData = new FormData();

        const platilloId = this.form.get('platilloId')?.value;

        formData.append(
            'Nombre',
            this.form.get('nombrePlatillo')?.value
        );
        const dd = this.form.get('categoriaPlatillo')?.value;
        formData.append(
            'CategoriaId',
            dd
        );
        formData.append(
            'ImagenUrl', 'htttp://cloudinary'
        )

        this.dueniaService.actualizarPlatilloSommee(formData,platilloId).subscribe(
            (message: string) => {
              Swal.close();
              Swal.fire(message,'', 'success');
              this.obtenerPlatillosSomee();
              this.resetForm();
              // Realizar otras acciones si es necesario
            },
            error => {
                Swal.fire(error,'', 'warning');

            }
          );
    }

    eliminarPlatilloSomee(platilloId:string){
        Swal.fire({
            title: '¿Estas seguro que deseas eliminar?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Procesando')
                Swal.showLoading()
                this.dueniaService.eliminarPlatilloSommee(platilloId).subscribe(
                    (message: string) => {
                      Swal.close();

                      Swal.fire(message,'', 'success');
                      this.obtenerPlatillosSomee();

                      // Realizar otras acciones si es necesario
                    },
                    error => {
                        Swal.fire(error, 'warning');

                    }
                  );
            } else {
              return;
            }
          })
    }

    resetForm() {
        this.form.reset();
    }

    resetFormPlatillo() {
        this.form.reset();
        this.files = [];
        this.disableZone = false;
    }

    isTouched() {
        Object.values(this.form.controls).forEach((control) => {
            control.markAsTouched();
        });
    }

    isRequerido(controlName: string) {
        const control = this.form.get(controlName);
        return control?.invalid && (control?.touched || control?.dirty);
    }
}
