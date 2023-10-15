import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectTablesComponent } from './pages/select-tables/select-tables.component';
import { RegisterOrderComponent } from './pages/register-order/register-order.component';
import { PaymentComponent } from './pages/Payment.Component';



const manageRoutes: Routes = [
    {
      path: 'select-tables',
      component:SelectTablesComponent,
    },
    {
        path: 'register-order/:mesaNombre',
        component:RegisterOrderComponent,
    },
    {
        path:'payments/:this.mesaNombre',
        component:PaymentComponent
    }

  ]

@NgModule({
    imports:[
      RouterModule.forChild(manageRoutes),
    ],
    exports:[
      RouterModule,
    ]
  })
  export class MeseraRoutingModule { }
