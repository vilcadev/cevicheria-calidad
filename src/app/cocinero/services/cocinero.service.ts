import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datum, RootObject } from '../interfaces/order.interface';
import { environment, environmentJson } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class CocineroService {

  private endpoint1: string ;
  private miapiUrl: string ;

  // ****** Environment JSON **
  private endpointJson:string;
  private miapiUrlJson:string;

  constructor(private http: HttpClient) {

    this.endpoint1 = environment.endPoint
    this.miapiUrl = this.endpoint1+"api/Orden/getOrden"

     //  ***********Api JSON
     this.endpointJson = environmentJson.endPoint;
     this.miapiUrlJson = this.endpointJson
  }




  obtenerOrdenes():Observable<Datum>{
    const response = this.http.get<Datum>(`${this.miapiUrl}`);
    return response;
  }

  obtenerOrdenesJson(){
    const response = this.http.get(`${this.miapiUrlJson}`)
    return response;
  }

}
