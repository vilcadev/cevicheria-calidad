import { Injectable } from '@angular/core';
import { User, Usuario } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private endpoint: string ;
  private miapiUrl: string ;

  constructor(private http:HttpClient) {
    // this.user = this.getUser(this.token);


    this.endpoint = 'http://localhost:3000/users/';
     this.miapiUrl = this.endpoint;
  }





  user: User;

  usuario:Usuario| undefined;

//   private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiY29jaW5lcm8ifQ.Dh-4MRk2x4-zIzY8xYNLzV2ebCMveUqbVScqqI553jo'

  login(correo:string): Observable<Usuario>{
    // localStorage.setItem('Token_User', this.token);
    console.log("correo");
    const response = this.http.get<Usuario>(`${this.miapiUrl}${correo}`);
    return response;


    // this.user = this.getUser(this.token);
    // return this.token;
  }

  public getUser(token: string): void{
    console.log("Entre a getUser");
    console.log({token});


    this.usuario = JSON.parse(atob(token.split('.')[1])) as Usuario;
    localStorage.setItem('Token_Usuario',this.usuario.jwt.toString());
    localStorage.setItem('Rol_User',this.usuario.role);
    console.log(this.usuario);

  }

  autenticar(jwt:Usuario){
    this.usuario = jwt;
    localStorage.setItem('Token_Usuario',jwt.toString());
  }

}
