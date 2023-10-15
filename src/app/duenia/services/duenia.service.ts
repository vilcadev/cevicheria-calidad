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




//  apiUrl = 'https://pllketvuesushgfthsad.supabase.co/rest/v1/dishes?select=*';
//  apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbGtldHZ1ZXN1c2hnZnRoc2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5NTMyNDMsImV4cCI6MjAxMjUyOTI0M30.KurB9eOxFj__fh6apP1xtYfLKZl0EfqfyPSK77O2v5s'; // Tu clave de API privada





// getDishes2(): Observable<Dishes[]> {

//   const supabaseUrl = 'https://pllketvuesushgfthsad.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsbGtldHZ1ZXN1c2hnZnRoc2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5NTMyNDMsImV4cCI6MjAxMjUyOTI0M30.KurB9eOxFj__fh6apP1xtYfLKZl0EfqfyPSK77O2v5s'
// const supabase = createClient(supabaseUrl, supabaseKey)

//   const requestOptions: Object = {
//     'apikey': this.apiKey,
//     'Authorization': `Bearer ${this.apiKey}`
//   };
//   return this.http.get<Dishes[]>(this.apiUrl, requestOptions);
// }






  async getDishes(){
  // you can also fetch all records at once via getFullList
    const pb = new PocketBase('http://127.0.0.1:8090');
    const dishes:Dishes[] = await pb.collection('platillos').getFullList({
      sort: '-created',
  });
  return dishes;
    };



  async addDishe(data: Dishes){
    const pb = new PocketBase('http://127.0.0.1:8090');

    const response = await pb.collection('platillos').create(data);

    return response;
  };

  async getOneDishe(disheId: string){
    const pb = new PocketBase('http://127.0.0.1:8090');

    const dishe: Dishes = await pb.collection('platillos').getOne(disheId);

    return dishe;
  }

  async updateDishe(data: Dishes){
    const pb = new PocketBase('http://127.0.0.1:8090');

    const response = await pb.collection('platillos').update(data.id,data)
    return response;
  }

  async deleteDishe(disheId: string){
    const pb = new PocketBase('http://127.0.0.1:8090');
    const response = await pb.collection('platillos').delete(disheId);
    return response;

  }


  private endpoint1: string ;
  private miapiUrl: string ;

  constructor(private http: HttpClient) {
    this.endpoint1 = environment.endPoint
    this.miapiUrl = this.endpoint1+"platillos/"
  }


  obtenerPlatillos():Observable<Dishes1[]>{
    return this.http.get<Dishes1[]>(`${this.miapiUrl}ListaCompleta`);
  }

   addDishe1(data: Dishes1){
    alert(JSON.stringify(data));
    return this.http.post(`${this.miapiUrl}Agregar`, data).pipe(
      catchError(error =>{
        console.error("Error al agregar platillo",error);
        throw error;
      })
    );
  };

  getOneDishe1(dishe: Dishes1):Observable<Dishes1>{
    alert(JSON.stringify(dishe.id))
    const dishe1= this.http.get<Dishes1>(`${this.miapiUrl}BuscarID/${dishe.id}`);

    return dishe1;
  }

  deleteDishe1(id: number){
    alert(JSON.stringify(id))
    const response= this.http.delete(`${this.miapiUrl}Eliminar/${id}`)
      // Suscríbete al observable para manejar la respuesta
  response.subscribe(
    (data) => {
      // Manejar la respuesta exitosa aquí
      console.log('Solicitud DELETE exitosa:', data);
    },
    (error) => {
      // Manejar errores aquí, si ocurren
      console.error('Error en la solicitud DELETE:', error);
    }
  );
  }


  // https://stackblitz.com/edit/f1xdm1?file=src%2Fexample%2Fautocomplete-require-selection-example.ts
}
