import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    template: `

        <div class="col-12">
            <div class="card card-w-title flex flex-wrap">
                <div class="col-12 md:col-8 h-full">
                    <h5>Registrar Orden</h5>
                    <p-tabMenu
                        styleClass="mb-5"
                        [model]="routeItems"
                    ></p-tabMenu>
                </div>
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
        </div>
        <h1>{{ mesaNombre }}</h1>
    `,
})
export class PaymentComponent implements OnInit {
    routeItems: MenuItem[] = [];
    mesaNombre: string;
    activeTabIndex: number = 0;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        // Recuperar el número de mesa de la URL
        this.route.params.subscribe((params) => {
            this.mesaNombre = params['this.mesaNombre']; // El "+" convierte el parámetro en un número
        });

        this.routeItems = [
            {
                label: 'Platillos',
                routerLink: ['/mesera/register-order', this.mesaNombre],
            },
            {
                label: 'Pagos',
                routerLink: ['/mesera/payments', this.mesaNombre],
            },
        ];
    }

    redirectToOrderPage() {
        this.router.navigate(['/mesera/register-order', this.mesaNombre]);
    }

    redirectToOrderPage1() {
        this.router.navigate(['/mesera/payments', this.mesaNombre]);
    }
}
