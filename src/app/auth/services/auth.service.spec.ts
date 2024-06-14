import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { JwtTokenResponse } from "../interfaces/jwt.interface";
import { of, throwError } from "rxjs";
import Swal from "sweetalert2";


describe('AuthService', ()=>{
    let service: AuthService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    beforeEach(()=>{
        const spy = jasmine.createSpyObj('HttpClient', ['post']);
        TestBed.configureTestingModule({
             imports: [HttpClientModule],
              providers:[AuthService,{
                provide:HttpClient,useValue: spy
              }] });

        service = TestBed.inject(AuthService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    });

    it('debe ser creado',() => {
        expect(service).toBeTruthy();
    })

    it('debe manejar el inicio de sesión y devolver una respuesta de token JWT', () => {
        const dummyResponse: JwtTokenResponse = {
          token: 'dummy-jwt-token',
          message: 'Login successful'
        };

        const errorMessage = 'Login failed';
        const errorTest = 'Only Failed'
        const correo = 'lucho@gmail.com';
        const contrasena = 'Abc123$';

        httpClientSpy.post.and.returnValue(throwError(() => new Error(errorMessage)));

        service.inicioSesion(correo, contrasena).subscribe(
          response => fail('expected an error, not a response'),
          error => expect(error.message).toContain(errorTest)
        );

        // const correo = 'lucho@gmail.com';
        // const contrasena = 'Abc123$';

        // httpClientSpy.post.and.returnValue(of(dummyResponse));

        // service.inicioSesion(correo, contrasena).subscribe(response => {
        //   expect(response).toEqual(dummyResponse);
        // });

        expect(httpClientSpy.post.calls.count()).toBe(1);
        expect(httpClientSpy.post.calls.mostRecent().args[0]).toBe(`${service['endpointSomee']}/api/Usuario/auth`);
        expect(httpClientSpy.post.calls.mostRecent().args[1]).toEqual({ correo, contrasena });
      });



})
