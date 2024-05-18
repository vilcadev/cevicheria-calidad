
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDishesComponent } from './pages/manage-dishes/manage-dishes.component';
import { ManageMenuComponent } from './pages/manage-menu/manage-menu.component';
import { ReportComponent } from './pages/report/report.component';
import { SalesComponent } from './pages/sales/sales.component';
import { authGuard } from '../auth/guards/auth.guard';
import { ManageCategoryComponent } from './pages/manage-category/manage-category.component';


const manageRoutes: Routes = [
    {
        path: 'manageCategory',
        component:ManageCategoryComponent,
        canActivate:[authGuard],
        data:{
          role:'admin'
        }
      },
    {
      path: 'manageDishes',
      component:ManageDishesComponent,
      canActivate:[authGuard],
      data:{
        role:'admin'
      }
    },
    {
      path: 'manageMenu',
      component:ManageMenuComponent,
      canActivate:[authGuard],
      data:{
        role:'admin'
      }
    },
    {
      path: 'sales',
      component: SalesComponent,
      canActivate:[authGuard],
      data:{
        role:'admin'
      }
    },
    {
      path: 'report',
      component:ReportComponent,
      canActivate:[authGuard],
      data:{
        role:'admin'
      }
    },
]


  @NgModule({
    imports:[
      RouterModule.forChild(manageRoutes),
    ],
    exports:[
      RouterModule,
    ]
  })
  export class DueniaRoutingModule { }
