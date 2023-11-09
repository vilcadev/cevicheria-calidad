
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDishesComponent } from './pages/manage-dishes/manage-dishes.component';
import { ManageMenuComponent } from './pages/manage-menu/manage-menu.component';


const manageRoutes: Routes = [
    {
      path: 'manageDishes',
      component:ManageDishesComponent,
    },
    {
      path: 'manageMenu',
      component:ManageMenuComponent,
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
