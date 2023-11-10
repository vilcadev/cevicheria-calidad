import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';



const manageRoutes: Routes = [
    {
      path: 'manageOrder',
      component:ManageOrderComponent,
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
  export class CocineroRoutingModule { }
