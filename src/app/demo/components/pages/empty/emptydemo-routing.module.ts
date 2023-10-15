import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageDishesComponent } from './emptydemo.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ManageDishesComponent }
    ])],
    exports: [RouterModule]
})
export class EmptyDemoRoutingModule { }
