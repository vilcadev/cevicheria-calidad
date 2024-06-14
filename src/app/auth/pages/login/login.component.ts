
import {  Component, type OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/user.interface';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { JwtTokenResponse } from '../../interfaces/jwt.interface';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [],

})
export class LoginComponent implements OnInit {

    valCheck: string[] = ['remember'];
    captcha: string;
    captchaCompleto: boolean = false;

    // password!: string;
    isLoading = false;
    email:string;
    password:string;
    jwt:string;

    jwtUsuario:Usuario;

    constructor(private authService: AuthService
        , private router: Router
        ){
            this.captcha  ='';

            const token = localStorage.getItem('token');
            if(token){
                this.authService.redirigirVista(token);
            }
            else{
                return;
            }
        }


    form = new FormGroup({
        email: new FormControl('',[
            Validators.required,
            Validators.email,
        ]),
        password: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]+$/)]),
    })

    ngOnInit(): void {


        const token = localStorage.getItem('token');
        if(token){
            this.authService.redirigirVista(token);
        }
        else{
            return;
        }

    }

    JWT!: JwtTokenResponse;
    onLogin(){


        if (this.form.valid) {
            this.isLoading = true;
            const email = this.form.get("email")?.value ?? '';
            const password = this.form.get("password")?.value ?? '';

            this.authService.inicioSesion(email, password).subscribe(
              (response: JwtTokenResponse) => {
                this.JWT = response;
                this.isLoading = false;
                console.log(this.JWT.token);
                localStorage.setItem('token', this.JWT.token);
                const role = this.authService.getRoleFromToken(this.JWT.token);

                switch (role) {
                  case 'admin':
                    this.router.navigate(['/duenia/manageDishes']);
                    break;
                  case 'mesera':
                    this.router.navigate(['/mesera/select-tables']);
                    break;
                  case 'cocinero':
                    this.router.navigate(['/cocinero/manageOrder']);
                    break;
                }

                // Detener el spinner de carga en caso de éxito
              },
              (error) => {
                console.error('Error en la petición de inicio de sesión:', error);
                // Manejar el error aquí si es necesario

                // Detener el spinner de carga en caso de error
                this.isLoading = false;
              }
            );
          }
    }


    resolved(captchaResponse: string){
        this.captcha = captchaResponse;
        console.log("resolved captcha:" + this.captcha);
        this.captchaCompleto=true;
    }


    // Validador personalizado para asegurar que no haya espacios en blanco
 noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  // Validador personalizado para contraseñas robustas
 passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    return passwordValid ? null : { passwordStrength: true };
  }

  isRequerido(controlName: string, errorType: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.errors && control?.errors[errorType] && (control?.touched || control?.dirty);
  }

}
