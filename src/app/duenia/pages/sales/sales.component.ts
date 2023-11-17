import { Component } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {

    cols: any[] = [];

    ventas:any[] = [
        {
            id:0,
            cliente: 'habilitado',
            emitido: '08/12/2023',
            total:1000
        },
        {
            id:0,
            cliente: 'deshabilitado',
            emitido: '08/10/2023',
            total:1500
        },
        {
            id:0,
            cliente: 'habilitado',
            emitido: '08/12/2023',
            total:20000
        },
    ]



}
