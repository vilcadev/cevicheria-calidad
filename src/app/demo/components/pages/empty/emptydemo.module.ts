import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { ManageDishesComponent } from './emptydemo.component';


//Directorio Components





import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { FormsModule } from '@angular/forms';




@NgModule({
    imports: [
        CommonModule,
        EmptyDemoRoutingModule,
        ToastModule,
        ToolbarModule,
        DropdownModule,
        FormsModule,
        ButtonModule,
        TableModule,
        DialogModule
    ],
    declarations: [ManageDishesComponent]
})
export class EmptyDemoModule { }
