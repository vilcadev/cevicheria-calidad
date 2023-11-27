
import {  Component, type OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/user.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [],

})
export class LoginComponent implements OnInit {

    valCheck: string[] = ['remember'];

    // password!: string;

    email:string;
    password:string;
    jwt:string;

    jwtUsuario:Usuario;

    constructor(private authService: AuthService
        , private router: Router
        ){}

    ngOnInit(): void { }


    onLogin(){
        this.authService.login(this.email).subscribe(
            (response) =>{

                this.jwt = response.jwt;

                console.log('JWT obtenido:', this.jwt);
                this.authService.getUser(this.jwt);

                let role = this.authService.usuario?.role;
                console.log("y soy el rol:",role)
                switch (role) {
                    case 'admin':
                      this.router.navigate(['/duenia/manageDishes']);  // Ruta para el administrador
                      break;
                    case 'mesera':
                      this.router.navigate(['/mesera/select-tables']);  // Ruta para la mesera
                      break;
                    case 'cocinero':
                      this.router.navigate(['/cocinero/manageOrder']);  // Ruta para el cocinero
                      break;
                    // Otros casos según los roles que tengas
                    default:
                      console.log('Rol no reconocido');
                      break;
                  }
            },
            (error) =>{
                console.log('Error obtenido:', error);
            }
        )

        // this.jwtUsuario = this.authService.getUser(this.jwt);

        // this.authService.autenticar(this.jwtUsuario);


        // let role = this.authService.user.role;

    }

}
