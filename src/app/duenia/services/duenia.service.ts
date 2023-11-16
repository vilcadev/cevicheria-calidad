import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Dishes } from '../interfaces/dishes.interface';

import { Dishes1 } from '../interfaces/dishes.interface';


import { HttpClient} from '@angular/common/http';
import { environment } from 'src/config';

import { Observable, catchError } from 'rxjs';
import { Platillo } from '../interfaces/platillos.interface';
// import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DueniaService {

  private endpoint1: string ;
  private miapiUrl: string ;

  constructor(private http: HttpClient) {
    this.endpoint1 = environment.endPoint
    this.miapiUrl = this.endpoint1+"api/Platillo"
  }


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

   addDishe1(nombre: string, categoriaId: number): Observable<string>{
    // console.log(data);
    const body = { nombre: nombre, categoriaId: categoriaId };
    return this.http.post(`${this.miapiUrl}`, body, { responseType: 'text' }).pipe(
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
