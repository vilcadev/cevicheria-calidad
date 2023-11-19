import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { authGuard } from '../auth/guards/auth.guard';



const manageRoutes: Routes = [
    {
      path: 'manageOrder',
      component:ManageOrderComponent,
      canActivate:[authGuard],
      data:{
        role:'cocinero'
      }
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
