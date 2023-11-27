import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datum, RootObject } from '../interfaces/order.interface';
import { environment, environmentJson } from 'src/config';
import { OrderHCocinero } from '../interfaces/orderHCocinero.interface';

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
    this.miapiUrl = this.endpoint1+"api/Orden/"

     //  ***********Api JSON
     this.endpointJson = environmentJson.endPoint;
     this.miapiUrlJson = this.endpointJson
  }




  obtenerOrdenesH():Observable<OrderHCocinero[]>{
    const response = this.http.get<OrderHCocinero[]>(`${this.miapiUrl}getOrdenesPorFecha/2023-11-27`);
    return response;
  }

  obtenerOrdenesJson(){
    const response = this.http.get(`${this.miapiUrlJson}`)
    return response;
  }

  actualizarEstadoOrden(ordenId: number, nuevoEstadoId: number){
    const data = {
        ordenId: ordenId,
        nuevoEstadoId: nuevoEstadoId
      };
      const response = this.http.patch(`${this.miapiUrl}actualizarEstadoOrden/${ordenId}/${nuevoEstadoId}`,data);
    return response;
  }



  editarEstadoDetalles(ordenId: number, nuevoEstadoId: number){
    const data:string='';
    const response = this.http.patch(`${this.miapiUrl}editarEstadoDetalles/${ordenId}/${nuevoEstadoId}`,data);
    return response;
  }

}
