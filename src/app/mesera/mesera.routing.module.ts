import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectTablesComponent } from './pages/select-tables/select-tables.component';
import { RegisterOrderComponent } from './pages/register-order/register-order.component';
import { authGuard } from '../auth/guards/auth.guard';



const manageRoutes: Routes = [
    {
      path: 'select-tables',
      component:SelectTablesComponent,
      canActivate:[authGuard],
      data:{
        role:'mesera'
      }
    },
    {
        path: 'register-order/:idMesa',
        component:RegisterOrderComponent,
        canActivate:[authGuard],
        data:{
          role:'mesera'
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
  export class MeseraRoutingModule { }
