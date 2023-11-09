import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'

import { ManageDishesComponent } from './pages/manage-dishes/manage-dishes.component';


import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';


import { DueniaRoutingModule } from './duenia-routing.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SidebarModule } from 'primeng/sidebar';
import { ManageMenuComponent } from './pages/manage-menu/manage-menu.component';

@NgModule({
    declarations:[
        ManageDishesComponent,
        MainMenuComponent,
        SideBarComponent,
        ManageMenuComponent
    ],
    imports:[
      CommonModule,
      ButtonModule,
      TableModule,
      DialogModule,
      ToastModule,
      ToolbarModule,
      DropdownModule,
      RadioButtonModule,
      InputTextModule,
      InputSwitchModule,

      DueniaRoutingModule,
      FormsModule,
      SidebarModule
    ],
    exports:[
        MainMenuComponent
    ]
    })
    export class DueniaModule { }
