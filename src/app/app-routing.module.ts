import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {
        path:'auth',
        loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )

    },
    {
        path:'duenia',
        loadChildren: () => import('./duenia/duenia.module').then(m => m.DueniaModule)
    },
    {
        path:'mesera',
        loadChildren: () => import('./mesera/mesera.module').then(m => m.MeseraModule)
    },
    {
        path:'cocinero',
        loadChildren: () => import('./cocinero/cocinero.module').then(m => m.CocineroModule)
    },
    { path: '', redirectTo: 'auth/login', pathMatch:'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
