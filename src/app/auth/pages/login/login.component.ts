
import {  Component, type OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [],

})
export class LoginComponent implements OnInit {

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(private authService: AuthService
        , private router: Router
        ){}

    ngOnInit(): void { }

    onLogin(){
        let token = this.authService.login()
        console.log(token);

        let role = this.authService.user.role;
        switch (role) {
            case 'admin':
              this.router.navigate(['/duenia/manageDishes']);  // Ruta para el administrador
              break;
            case 'mesera':
              this.router.navigate(['/mesera/select-tables']);  // Ruta para el usuario regular
              break;
            case 'cocinero':
              this.router.navigate(['/cocinero/manageOrder']);  // Ruta para el usuario regular
              break;
            // Otros casos según los roles que tengas
            default:
              console.log('Rol no reconocido');
              break;
          }
    }

}
