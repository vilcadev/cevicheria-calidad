import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ActivatedRouteSnapshot, Router } from "@angular/router";


export const authGuard= (route: ActivatedRouteSnapshot) => {

    const authService = inject(AuthService)
    const localStorageRole = localStorage.getItem('Rol_User');
    const router = inject(Router)
    const requiredRole = route.data['role'] as string;

    if(!localStorageRole || localStorageRole !== requiredRole){
        console.log('No autenticado')
        router.navigate(['./auth/login'])
        return false;
    }
    console.log(`Autenticado ${requiredRole}`)
    return true;


};
