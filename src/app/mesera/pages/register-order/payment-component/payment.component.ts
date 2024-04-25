import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'payment-component',
    template:`
    <div  class="flex flex-column ">
                        <!-- <div class="col-12 md:col-4 mt-5 md:mt-0">
                    <router-outlet></router-outlet>
                </div> -->

                        <h5>Boleta</h5>
                        <hr />
                        <span class="p-float-label">
                            <input
                                type="text"
                                id="inputtext"
                                pInputText
                                style="width: 300px;"
                            />
                            <label for="inputtext">Enviar a...</label>
                        </span>

                        <div style="display: flex;align-items: flex-end;">
                            <h3>Total</h3>
                            <h3>Total</h3>
                        </div>

                        <hr />
                        <span class="p-float-label">
                            <input
                                type="text"
                                id="Nombre Cliente"
                                pInputText
                                style="width: 300px;"
                            />
                            <label for="inputtext">Nombre Cliente</label>
                        </span>
                        <hr />
                        <span class="p-float-label">
                            <input
                                type="number"
                                id="DNI"
                                pInputText
                                style="width: 300px;"
                            />
                            <label for="inputtext">DNI</label>
                        </span>
                        <hr>

                        <span class="p-buttonset">
                            <button
                                pButton
                                pRipple
                                type="button"
                                label="Imprimir"
                                class="p-button-raised p-button-secondary"
                                icon="pi pi-print"
                            ></button>
                            <button
                                pButton
                                pRipple
                                type="button"
                                label="Generar Comprobante de Pago"
                                class="p-button-raised p-button-danger"
                                icon="pi pi-print"
                            ></button>
                        </span>
    </div>
    `
})

export class PaymentComponentM implements OnInit {
    constructor() { }

    ngOnInit() {
        console.log("hola")
    }
}
