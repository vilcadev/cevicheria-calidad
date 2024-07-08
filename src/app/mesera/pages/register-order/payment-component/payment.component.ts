import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DetalleComprobante, IComprobante } from 'src/app/mesera/interfaces/comprobante.interface';
import { OrdenDetalle } from 'src/app/mesera/interfaces/ordenDetalle.interface';
import { EPlatilloM } from 'src/app/mesera/interfaces/order.interface';
import { MeseraService } from 'src/app/mesera/services/mesera.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'payment-component',
    template: `
        <style>
            .my-span:hover {
                /* --tw-bg-opacity: 1 !important;
            background-color: rgba(228,228,231, 1) !important; */
                cursor: pointer;
            }
            .tw-bg-red-500 {
                --tw-bg-opacity: 1 !important;
                background-color: rgba(113, 113, 122, 1) !important;
            }

            .tw-w-full {
    width: 100% !important;
}
.tw-flex {
    display: flex !important;
}

            .width-300 {
    width: 300px;
}
.tw-items-center {
    align-items: center !important;
}
.tw-justify-center {
    justify-content: center !important;
}


.tw-bg-susii-red-500 {
    --tw-bg-opacity: 1 !important;
    background-color: rgba(226,30,66, 1) !important;
    border-color: rgba(226,30,66, 1);
}

.tw-bg-susii-red-500:hover {
    --tw-bg-opacity: 1 !important;
    background-color: rgba(199,26,57, 1) !important;
    background-color: rgba(199,26,57, 1) !important;
}




.tw-text-white {
    --tw-text-opacity: 1 !important;
    color: rgba(255,255,255, 1) !important;
}
.tw-font-semibold {
    font-weight: 600 !important;
}
.xl\:tw-rounded-l-2xl {
        border-radius: 1rem !important;
    }

    .tw-flex-grow {
    flex-grow: 1 !important;
}

button:not(:disabled) {
    cursor: pointer;
}

.tw-text-lg, .tw-text-xl {
    line-height: 1.75rem !important;
}


svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
    overflow: visible;
    box-sizing: content-box;
}
.svg-inline--fa {
    display: var(--fa-display, inline-block);
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
    margin-right: 0.625rem !important;
}
.tw-py-2\.5 {
    padding-top: .625rem !important;
}
.tw-h-16 {
    height: 4rem !important;
    width: 250px;
    margin-left: auto;
}

button{
    border: none;
    height: 4rem;
    border-radius: 1rem;
}
span{
    font-size: 1.225rem !important;
}


            @media (max-width: 580px) {
              .my-flex{
                flex-direction: column;
              }
            }

            .width-autocomplete{
    display: grid;
    width: 20rem;
}
        </style>
        <form [formGroup]="form" (ngSubmit)="registrarComprobante()">
        <div class="flex flex-column ">
            <!-- <div class="col-12 md:col-4 mt-5 md:mt-0">
                    <router-outlet></router-outlet>
                </div> -->

            <h5 style="margin-bottom: 20px;">Información</h5>
            <div class="grid my-flex">
                <div class="col-6">
                    <div class="p-inputgroup">
                        <span
                            (click)="showWhatsapp()"
                            class="p-inputgroup-addon my-span"
                            [ngClass]="{ 'tw-bg-red-500': whatsappButton }"
                            ><i
                                class="pi pi-whatsapp"
                                [style.color]="
                                    whatsappButton ? '#FFFFFF' : 'black'
                                "
                            ></i
                        ></span>
                        <span
                            (click)="showGmail()"
                            class="p-inputgroup-addon my-span"
                            [ngClass]="{ 'tw-bg-red-500': gmailButton }"
                            ><i
                                class="pi pi-envelope"
                                [style.color]="
                                    gmailButton ? '#FFFFFF' : 'black'
                                "
                            ></i
                        ></span>
                        <input
                        type="number"
                        maxlength="9"
                        appOnlyNumbers
                        formControlName="contacto"
                            *ngIf="whatsappButton"
                            type="text"
                            pInputText
                            placeholder="Enviar a..."
                        />
                        <input
                        formControlName="contacto"
                        [ngClass]="{
                            'ng-dirty ng-invalid': form.controls.contacto.invalid && form.controls.contacto.touched
                          }"
                            *ngIf="gmailButton"
                            type="text"
                            pInputText
                            placeholder="Enviar a..."
                        />
                    </div>

                </div>
                <div class="col-6">

                    </div>
            </div>

            <h5 style="margin-bottom: 20px;" >Boleta</h5>
            <div class="grid my-flex">
                <div class="col-6">
                <input formControlName="nombreCliente" type="text" pInputText placeholder="Cliente" style="width: 300px;" maxlength="20">
                </div>
                <div class="col-6">
                        <input maxlength="8" type="number" formControlName="dni" type="text" pInputText placeholder="DNI" class="width-300" appOnlyNumbers>
                    </div>
            </div>


            <div class="grid my-flex" style="margin-top: 50px;">
                <div class="col-6">
                <h5>Total</h5>
                </div>
                <div class="col-6" >
                <h5 *ngIf="total">S/ {{ total | number:'1.2-2'}}</h5>
                    </div>
            </div>

            <hr />

            <div class="tw-h-16">
            <div data-v-1dde7998="" data-v-7565b8e2="" class="tw-flex-grow"><button (click)=generarPDF() type="submit" style=" border: none;" data-v-1dde7998=""
                                data-v-7565b8e2="" split=""
                                class="tw-rounded-none xl:tw-rounded-l-2xl tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-susii-red-500 hover:tw-bg-susii-red-600 tw-text-white tw-font-semibold tw-py-2.5"
                                data-dashlane-rid="b9135939baf3f208" data-dashlane-label="true"
                                data-form-type="other"><span data-v-1dde7998="" data-v-7565b8e2=""
                                    class="tw-text-xl"><svg data-v-1dde7998="" data-v-7565b8e2="" aria-hidden="true"
                                        focusable="false" data-prefix="far" data-icon="print" role="img"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                        class="tw-hidden lg:tw-block tw-mr-2.5 2xl:tw-mr-3.5 svg-inline--fa fa-print">
                                        <path data-v-1dde7998="" data-v-7565b8e2="" fill="currentColor"
                                            d="M111.1 48h254.1L400 81.94V160H448V81.94c0-12.73-5.057-24.94-14.06-33.94l-33.94-33.94C391 5.057 378.8 0 366.1 0H111.1C85.49 0 64.01 21.48 64 47.98l.002 82.28c-.002 0 .002 0 0 0L64 160h48.01L111.1 48zM440 192H72C32.3 192 0 224.3 0 264v112c0 13.25 10.75 24 24 24H80V480c0 17.67 14.33 32 32 32h288c17.67 0 32-14.33 32-32v-80h56c13.25 0 24-10.75 24-24v-112C512 224.3 479.7 192 440 192zM384 464H128v-96h256V464zM464 352h-32c0-17.67-14.33-32-32-32h-288c-17.67 0-32 14.33-32 32h-32V264c0-13.23 10.77-24 24-24h368c13.23 0 24 10.77 24 24V352z"
                                            class=""></path>
                                    </svg></span> <span data-v-1dde7998="" data-v-7565b8e2=""
                                    class="tw-text-lg lg:tw-text-base 2xl:tw-text-lg">Finalizar</span></button></div>
            </div>
        </div>
        </form>

    `,
})
export class PaymentComponentM implements OnInit {

    cities: SelectItem[] = [];
    platillosList:EPlatilloM[]=[];
    ordenDetalle:OrdenDetalle;
    total:number=0;
    selectedDrop: SelectItem = { value: '' };
    private router: Router;
    idMesa: string;
    form!: FormGroup;
    isFormSubmitted = false;


    constructor(private route: ActivatedRoute, private meseraService:MeseraService, public fb:FormBuilder,private location:Location) {
        this.form = this.fb.group({
            contacto: ['', this.validateContact()],
            nombreCliente: [''],
            dni: ['']
        });
    }

    validateContact(): any {
        return (control: AbstractControl) => {
          if (this.whatsappButton) {
            // Validar número de teléfono para WhatsApp
            const isValid = /^\d+$/.test(control.value);
            return isValid ? null : { invalidContact: true };
          } else if (this.gmailButton) {
            // Validar email para Gmail
            return Validators.email(control);
          }
          return null;
        };
      }




    ngOnInit() {

        this.cities = [
            { label: 'BCP', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'VISA', value: { id: 2, name: 'Rome', code: 'RM' } },
        ];

        this.route.params.subscribe(params => {
            // this.idMesa = params['idMesa']; // El "+" convierte el parámetro en un número
            this.idMesa = params['idMesa']; // El "+" convierte el parámetro en un número
            console.log(this.idMesa)

          });

          this.obtenerOrdenSomee();
    }

    obtenerOrdenSomee(){
        this.meseraService.obtenerOrdenSomee(this.idMesa).subscribe((response:OrdenDetalle)=>{
            this.ordenDetalle = response;
            console.log(this.ordenDetalle)

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
        });
      }

      registrarComprobante(){

        if (this.form.invalid) {
            this.isFormSubmitted = true;
            this.isTouched();
            return;
        }
        const detalleComprobante: DetalleComprobante[]=[];

        for (let i = 0; i < this.platillosList.length; i++) {

            detalleComprobante.push({
                nombre: this.platillosList[i].nombre,
                cantidad: this.platillosList[i].cantidad,
                precioUnitario: this.platillosList[i].precioUnitario,
            })

        }

        const comprobanteRequest:IComprobante ={
            ordenId: this.ordenDetalle.idOrden,
            fecha: this.formatearFecha(new Date),
            mesaId: this.ordenDetalle.mesaId,
            nombreCliente:   this.form.get('nombreCliente')?.value || 'none',
            contacto:   this.form.get('contacto')?.value,
            dni:   this.form.get('dni')?.value || '666',
            montoTotal: this.total,
            detalles: detalleComprobante

        }
        console.log(comprobanteRequest)

        this.meseraService.registrarComprobante(comprobanteRequest).subscribe(
            (response) => {
                if(response.response.isSuccess){
                    Swal.close();
                    Swal.fire(response.response.isSuccess,'', 'success');
                    this.back();
                    return;
                }
              }
        )
      }

      back() {
        this.location.back(); // <-- go back to previous location on cancel
      }


    generarPDF(){
        if(this.platillosList.length === 0){
            alert('Ningún platillo encontrado para el comprobante')
        }
        else{
            this.meseraService.generatePDF(this.ordenDetalle.nombreMesa,this.platillosList, this.total);
        }

    }

    whatsappButton: boolean = true;
    gmailButton: boolean = false;
    fechaSeleccionada: Date;
    showWhatsapp() {
        console.log('hoals');
        this.whatsappButton = true;
        this.gmailButton = false;
    }

    showGmail() {
        this.whatsappButton = false;
        this.gmailButton = true;
    }

    formatearFecha(fecha:Date){
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11, por lo que necesitas agregar 1
        const day = fecha.getDate().toString().padStart(2, '0');
        const hours = fecha.getHours().toString().padStart(2, '0');
        const minutes = fecha.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
      }

      isTouched() {
        Object.values(this.form.controls).forEach((control) => {
            control.markAsTouched();
        });
    }
}
