import { Injectable } from '@angular/core';
import { User, Usuario } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { JwtTokenResponse } from '../interfaces/jwt.interface';
import { environmentSomee } from 'src/config';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


interface TokenPayload {
    email: string;
    rol: string;
    exp: number;
  }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpointSomee: string ;
  token!: TokenPayload;
  constructor(private http:HttpClient,private router: Router) {
     this.endpointSomee = environmentSomee.endPoint
  }

  public inicioSesion(correo: string, contrasena: string):Observable<JwtTokenResponse>{
    const body = { correo, contrasena };
    return this.http.post<JwtTokenResponse>(`${this.endpointSomee}/api/Usuario/auth`,body).pipe(
        catchError((error) => {
          let errorMessage = 'Ha ocurrido un error'; // Mensaje por defecto

          if (error && error.error && error.error.message) {
            errorMessage = error.error.message; // Mensaje de error del backend si está disponible
          }

          Swal.fire(errorMessage,'', 'warning'); // Mensaje de error al usuario
          return throwError(() => error);
        })
      );
  }

  redirigirVista(JWT: string){
    const role = this.getRoleFromToken(JWT);
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
  }


  public getRoleFromToken(token: string):string{
      this.token = jwtDecode(token) as TokenPayload;
      console.log(this.token.rol)
      return this.token.rol;
  }

}
