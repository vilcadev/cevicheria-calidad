import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-tables',
  templateUrl: './select-tables.component.html',
  styleUrls: ['./select-tables.component.scss']
})
export class SelectTablesComponent {

    mesas:string[] =['Mesa 1','Mesa 2','Mesa 3','Mesa 4','Mesa 5','Mesa 6' ];



    constructor(private router: Router){}


    redirectToOrderPage(mesaNombre: string){
        this.router.navigate(['/mesera/register-order',mesaNombre]);
    }

}
