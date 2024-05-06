import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'




import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';



import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

import { InputSwitchModule } from 'primeng/inputswitch';

import { SidebarModule } from 'primeng/sidebar';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { CocineroRoutingModule } from './cocinero-routing.module';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { SideBarCocineroComponent } from './components/side-bar-cocinero/side-bar-cocinero.component';



@NgModule({
    declarations:[
        ManageOrderComponent,
        SideBarCocineroComponent

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
      BadgeModule,

      CocineroRoutingModule,
      FormsModule,
      SidebarModule
    ],
    providers:[MessageService],
    exports:[
    ]
    })
    export class CocineroModule { }
