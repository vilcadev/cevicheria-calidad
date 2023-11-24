import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.user = this.getUser(this.token);
  }

  user: User;

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoibWVzZXJhIn0.oHYfgm7Vus6A3JlyvjFKzDFv6VK5Okm1GFrnj_VhwjY'

  login(): string{
    localStorage.setItem('Token_User', this.token);
    this.user = this.getUser(this.token);
    return this.token;
  }

  private getUser(token: string): User{

    return JSON.parse(atob(token.split('.')[1])) as User;

  }

}
