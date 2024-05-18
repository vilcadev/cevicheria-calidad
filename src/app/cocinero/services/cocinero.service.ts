import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Datum, RootObject } from '../interfaces/order.interface';
import { environment, environmentJson, environmentSomee } from 'src/config';
import { EOrderRegistrada, EOrderRegistradaDetalle, OrderHCocinero } from '../interfaces/orderHCocinero.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CocineroService {

  private endpoint1: string ;
  private miapiUrl: string ;
  private endpointSomee: string ;

  // ****** Environment JSON **
  private endpointJson:string;
  private miapiUrlJson:string;

  constructor(private http: HttpClient) {

    this.endpoint1 = environment.endPoint
    this.miapiUrl = this.endpoint1+"api/Orden/"
    this.endpointSomee = environmentSomee.endPoint


     //  ***********Api JSON
     this.endpointJson = environmentJson.endPoint;
     this.miapiUrlJson = this.endpointJson
  }




  obtenerOrdenesH():Observable<OrderHCocinero[]>{
    const response = this.http.get<OrderHCocinero[]>(`${this.miapiUrl}getOrdenesPorFecha/2023-11-28`);
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



  //************************************************ */
  obtenerOrdenesRegistradasSomee():Observable<EOrderRegistrada[]>{
    return this.http.get<EOrderRegistrada[]>(`${this.endpointSomee}/api/Orden`)
  }

  obtenerDetallerOrdenRegistradaSomee(mesaId:string):Observable<EOrderRegistradaDetalle>{
    return this.http.get<EOrderRegistradaDetalle>(`${this.endpointSomee}/api/Orden/GetOrderMesa?id=${mesaId}`);
  }

  actualizarOrdenRegistradaSomee(idOrden:string, estadoOrden:number):Observable<any>{
    const body = { estadoOrden: estadoOrden };
    return this.http.put<any>(`${this.endpointSomee}/api/Orden/${idOrden}?estadoOrden=${estadoOrden}`,body).pipe(
        map(response => response.response.isSuccess),
        catchError(error => {
          Swal.fire('Error', error, 'warning');
          throw error;
        })
      );
  }

}
