import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
       {
        path:'duenia',
    loadChildren: () => import('./duenia/duenia.module').then(m => m.DueniaModule)
       },
      {
        path:'mesera',
        loadChildren: () => import('./mesera/mesera.module').then(m => m.MeseraModule)
      },
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
