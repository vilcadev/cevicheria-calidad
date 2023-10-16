import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-register-order',
  templateUrl: './register-order.component.html',
  styleUrls: ['./register-order.component.scss']
})
export class RegisterOrderComponent implements OnInit{

    routeItems: MenuItem[] = [];


    mesaNombre: string;
    constructor(private route: ActivatedRoute,
        private router: Router) {}
    ngOnInit(): void {

        // Recuperar el número de mesa de la URL
    this.route.params.subscribe(params => {
        this.mesaNombre = params['mesaNombre']; // El "+" convierte el parámetro en un número
      });



      this.routeItems = [
        { label: 'Platillos',routerLink:['/mesera/register-order',this.mesaNombre]},
        { label: 'Pagos',routerLink:['/mesera/payments',this.mesaNombre]},
    ];

    }




}
