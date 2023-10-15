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

@NgModule({
    declarations:[
        ManageDishesComponent,
        MainMenuComponent
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

      DueniaRoutingModule,
      FormsModule,
    ],
    })
    export class DueniaModule { }
