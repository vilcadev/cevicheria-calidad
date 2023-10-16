import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Dishes } from '../interfaces/dishes.interface';

import { Dishes1 } from '../interfaces/dishes.interface';


import { HttpClient} from '@angular/common/http';
import { environment } from 'src/config';

import { Observable, catchError } from 'rxjs';
// import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DueniaService {

  private endpoint1: string ;
  private miapiUrl: string ;

  constructor(private http: HttpClient) {
    this.endpoint1 = environment.endPoint
    this.miapiUrl = this.endpoint1+"platillos/"
  }


  obtenerPlatillos():Observable<Dishes1[]>{
    const response = this.http.get<Dishes1[]>(`${this.miapiUrl}ListaCompleta`);
    return response;
  }

   addDishe1(data: Dishes1): Observable<any>{
    console.log(data);
    return this.http.post(`${this.miapiUrl}Agregar`, data, { responseType: 'text' }).pipe(
      catchError(error =>{
        console.error("Error al agregar platillo",error);
        throw error;
      })
    );
  };

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


  // https://stackblitz.com/edit/f1xdm1?file=src%2Fexample%2Fautocomplete-require-selection-example.ts
}
