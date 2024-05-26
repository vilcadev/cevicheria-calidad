import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ActivatedRouteSnapshot, Router } from "@angular/router";


export const authGuard= (route: ActivatedRouteSnapshot) => {

    const authService = inject(AuthService)
    const router = inject(Router)

    let localStorageRole
    const token = localStorage.getItem('token')
    if(token){
        localStorageRole = authService.getRoleFromToken(token);
    }
    else{
        router.navigate(['./auth/login'])
    }


    const requiredRole = route.data['role'] as string;

    if(!localStorageRole || localStorageRole !== requiredRole){
        console.log('No autenticado',requiredRole)
        router.navigate(['./auth/login'])
        return false;
    }
    console.log(`Autenticado ${requiredRole}`)
    return true;


};
