import { Component, OnInit } from '@angular/core';
import { Dishes, Dishes1 } from '../../interfaces/dishes.interface';
import { DueniaService } from '../../services/duenia.service';
import { MessageService } from 'primeng/api';
import { EPlatillo, Platillo } from '../../interfaces/platillos.interface';
import { map } from 'rxjs';
import { Categoria } from '../../interfaces/categoria.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { envAzure } from 'src/config';

@Component({
    selector: 'manage-dishes',
    templateUrl: './manage-dishes.component.html',
    styleUrls: ['./manage-dishes.component.scss'],
    providers: [MessageService],
})
export class ManageDishesComponent implements OnInit {
    form!: FormGroup;
    isFormSubmitted = false;
    enivonmentAzureImage ='';

    constructor(
        private dueniaService: DueniaService,
        private messageService: MessageService,
        public fb: FormBuilder
    ) {
        this.form = this.fb.group({
            platilloId:[''],
            nombrePlatillo: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+(?: [a-zA-Z]+)*$'), Validators.maxLength(20)]],
            categoriaPlatillo: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.obtenerCategorias();
        this.obtenerPlatillosSomee();
        this.enivonmentAzureImage = envAzure.url;
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





    //*********************************************************************/
    files: File[] = [];
    disableZone: boolean = false;
    uploadImage:boolean = false;

    onSelect(event: any) {
        // console.log(event);
        // if (this.files.length < 1) {
        //     this.files.push(...event.addedFiles);
        //     this.disableZone = true;
        // } else {
        //     console.log('mas de uno');
        // }
        console.log(event);
        if (this.files.length === 1) {
          // Reemplazar el archivo existente con el nuevo archivo cargado
          this.files.splice(0, 1, ...event.addedFiles);
          this.disableZone = true;
        } else if (this.files.length === 0) {
          // Si no hay archivos, añadir el nuevo archivo
          this.files.push(...event.addedFiles);
          this.disableZone = true;
        } else {
          console.log('Ya hay más de un archivo');
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
        formData.append(
            'CategoriaId',
            this.form.get('categoriaPlatillo')?.value
        );

        if(this.files){
            formData.append(
                'ImagenUrl', this.files[0]
            )
        }


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

    varUrl: string='';
    cargarPlatilloSomee(platillo:EPlatillo){
        this.uploadImage = true;
        this.productDialog=true;
        this.form.patchValue({
            platilloId:platillo.idPlatillo,
            nombrePlatillo: platillo.nombre,
            categoriaPlatillo: platillo.categoriaId
        });

        const imagen = `${envAzure.url}${platillo.imagenUrl}`

        if(imagen && platillo.imagenUrl){
        fetch(imagen)
        .then(response => response.blob())
        .then(blob => {
          const file = new File([blob], platillo.nombre, { type: blob.type });
          this.files.push(file);
          this.uploadImage = false;
        });

        this.varUrl = platillo.imagenUrl;
        } else{
            this.uploadImage=false;
        }





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
        formData.append(
            'CategoriaId',
            this.form.get('categoriaPlatillo')?.value
        );
        if(this.files){
            formData.append(
                'ImagenUrl', this.files[0]
            )
        }
        formData.append(
            'Url', this.varUrl
        )


        this.dueniaService.actualizarPlatilloSommee(formData,platilloId).subscribe(
            (message: string) => {
              Swal.close();
              Swal.fire(message,'', 'success');
              this.obtenerPlatillosSomee();
              this.resetForm();
              this.varUrl ='';
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

    isRequerido(controlName: string, errorType: string) {
        const control = this.form.get(controlName);
        return control?.invalid && control?.errors && control?.errors[errorType] && (control?.touched || control?.dirty);
      }
}
