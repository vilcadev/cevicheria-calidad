import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
	template: `
		<p>payment works!</p>

<div class="col-12">
    <div class="card card-w-title flex flex-wrap">
        <div class="col-12 md:col-8 h-full">
            <h5>TabMenu</h5>
            <p-tabMenu styleClass="mb-5" [model]="routeItems" ></p-tabMenu>

            <h5>Steps</h5>
            <p-steps [model]="routeItems" styleClass="mt-5" [readonly]="false"></p-steps>
        </div>
        <div class="col-12 md:col-4 mt-5 md:mt-0">
            <router-outlet></router-outlet>
        </div>
    </div>
</div>

<h1>{{mesaNombre}}</h1>

  	`
})
export class PaymentComponent implements OnInit {

    routeItems: MenuItem[] = [];
    mesaNombre: string;
    activeTabIndex: number = 0;

    constructor(private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit(): void {
        // Recuperar el número de mesa de la URL
    this.route.params.subscribe(params => {
        this.mesaNombre = params['this.mesaNombre']; // El "+" convierte el parámetro en un número
      });



      this.routeItems = [
        { label: 'Platillos',routerLink:['/mesera/register-order',this.mesaNombre]},
        { label: 'Pagos', routerLink:['/mesera/payments',this.mesaNombre]},

    ];

    }


    redirectToOrderPage(){
        this.router.navigate(['/mesera/register-order',this.mesaNombre]);

    }

    redirectToOrderPage1(){
    this.router.navigate(['/mesera/payments',this.mesaNombre]);
    }


}
