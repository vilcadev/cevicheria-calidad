import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Dishes } from '../interfaces/dishes.interface';

import { Dishes1 } from '../interfaces/dishes.interface';


import { HttpClient} from '@angular/common/http';
import { environment, environmentSomee } from 'src/config';

import { Observable, catchError, map, throwError } from 'rxjs';
import { EPlatillo, Platillo } from '../interfaces/platillos.interface';
import { Categoria } from '../interfaces/categoria.interface';
import Swal from 'sweetalert2';
import { Menu, MenuRequest } from '../interfaces/menu.interface';
// import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DueniaService {

  private endpoint1: string ;
  private miapiUrl: string ;
  private miapiUrl2: string ;
  private endpointSomee: string ;


  constructor(private http: HttpClient) {
    this.endpoint1 = environment.endPoint
    this.endpointSomee = environmentSomee.endPoint
    this.miapiUrl = this.endpoint1+"api/Platillo"
    this.miapiUrl2 = this.endpoint1+"api/Menu/"
  }

// ***************Métodos Manage Dishes********************
  // Método para obtener los platillos
  obtenerPlatillos():Observable<Platillo>{
    const response = this.http.get<Platillo>(`${this.miapiUrl}`);
    return response;
  }

  actualizarPlatillo(data:Platillo){
    const body = { id:data.id, nombre: data.nombre, categoriaId: data.categoria.id };
    const response = this.http.put(`${this.miapiUrl}`,body, { responseType: 'text' });
    return response;
  }

  eliminarPlatillo(id: number){
    const response= this.http.delete(`${this.miapiUrl}/${id}`,{ responseType: 'text' });
    return response;
  }

   agregarPlatillo(nombre: string, categoriaId: number): Observable<string>{
    // console.log(data);
    const body = { nombre: nombre, categoriaId: categoriaId };
    return this.http.post(`${this.miapiUrl}`, body, { responseType: 'text' }).pipe(
      catchError(error =>{
        console.error("Error al agregar platillo",error);
        throw error;
      })
    );
  };
  // ************************
//   ***********Métodos Manage Menu*************

  getOneDishe1(dishe: Dishes1):Observable<Dishes1>{
    const dishe1= this.http.get<Dishes1>(`${this.miapiUrl}BuscarID/${dishe.id}`);

    return dishe1;
  }

  updateDishe1(data:Dishes1){

    const response = this.http.put(`${this.miapiUrl}Actualizar/${data.id}`,data, { responseType: 'text' });
    return response;

  }

  deleteDishe1(id: number){
    const response= this.http.delete(`${this.miapiUrl}Eliminar/${id}`,{ responseType: 'text' });
    return response;
  }


  agregarMenu(data:any){
    console.log("Dentro de service")
    console.log({data});
    const response = this.http.post(`${this.miapiUrl2}addMenuDetalle`,data, { responseType: 'text' });
    return response;
  }
// *******************************************************************************

  obtenerCategoriaSomee():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.endpointSomee}/api/categoria`);
  }

  obtenerPlatillosSommee():Observable<EPlatillo[]>{
    return this.http.get<EPlatillo[]>(`${this.endpointSomee}/api/platillo`);
  }

  agregarPlatillosSommee(platillo:FormData):Observable<any>{
    return this.http.post<any>(`${this.endpointSomee}/api/platillo`,platillo).pipe(
        catchError(error => {
            Swal.fire('Error al agregar el platillo',error, 'warning');
            return throwError(() => error);
        })
    );
  }

  actualizarPlatilloSommee(platillo:FormData,platilloId:string):Observable<any>{
    return this.http.put<any>(`${this.endpointSomee}/api/platillo/${platilloId}`,platillo).pipe(
        map(response => response.response.isSuccess),
        catchError(error => {
          Swal.fire('Error', error, 'warning');
          throw error;
        })
      );
  }

  eliminarPlatilloSommee(platilloId:string):Observable<any>{
    return this.http.delete<any>(`${this.endpointSomee}/api/platillo/${platilloId}`).pipe(
        map(response => response.response.isSuccess),
        catchError(error => {
          Swal.fire('Error', error, 'warning');
          throw error;
        })
      );
  }


  obtenerMenu(fecha:string):Observable<Menu[]>{
    return this.http.get<Menu[]>(`${this.endpointSomee}/api/Menu?fecha=${fecha}`);
  }

  agregarMenuSommee(menuRequest:MenuRequest):Observable<any>{
    return this.http.post<any>(`${this.endpointSomee}/api/Menu`,menuRequest).pipe(
        catchError(error => {
            Swal.fire('Ya existe un menú registrado para esta fecha',error, 'warning');
            return throwError(() => error);
        })
    );
  }




  // https://stackblitz.com/edit/f1xdm1?file=src%2Fexample%2Fautocomplete-require-selection-example.ts
}
