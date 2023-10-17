import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { SelectTablesComponent } from './pages/select-tables/select-tables.component';
import { MeseraRoutingModule } from './mesera.routing.module';


import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';


//Register Order Imports
import { TabMenuModule } from 'primeng/tabmenu';
import { StepsModule } from 'primeng/steps';
import { RegisterOrderComponent } from './pages/register-order/register-order.component';
import { PaymentComponent } from './pages/Payment.Component';

import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations:[

    SelectTablesComponent,
    RegisterOrderComponent,
    PaymentComponent

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
    InputTextModule
  ],
  })
  export class MeseraModule { }
