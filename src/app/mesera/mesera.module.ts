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
    StepsModule
  ],
  })
  export class MeseraModule { }
