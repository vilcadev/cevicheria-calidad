import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { SelectTablesComponent } from './pages/select-tables/select-tables.component';
import { MeseraRoutingModule } from './mesera.routing.module';


import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';


//Register Order Imports
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { RegisterOrderComponent } from './pages/register-order/register-order.component';

import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { Table, TableModule } from 'primeng/table';
import { MeseraService } from './services/mesera.service';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PaymentComponentM } from './pages/register-order/payment-component/payment.component';
import { PlatillosComponentM } from './pages/register-order/platillos-component/platillos.component';
import { FormsModule } from '@angular/forms';
import { SpeedDialModule } from 'primeng/speeddial';
import { SideBarMeseraComponent } from './components/side-bar-mesera/side-bar-mesera.component';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations:[

    SelectTablesComponent,
    RegisterOrderComponent,
    PaymentComponentM,
    PlatillosComponentM,
    SideBarMeseraComponent

  ],
  imports:[
    CommonModule,
    MeseraRoutingModule,
    DataViewModule,
    PickListModule,
    OrderListModule,
    TabMenuModule,
    StepsModule,
    ToggleButtonModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    TableModule,
    ChipsModule,
    DropdownModule,
    ToolbarModule,
    SplitButtonModule,
    FormsModule,
    SpeedDialModule,
    SidebarModule,
    CalendarModule,
    FullCalendarModule
  ],
  providers:[  DatePipe,MeseraService]
  })
  export class MeseraModule { }
