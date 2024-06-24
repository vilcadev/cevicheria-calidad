import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

import { environmentSomee } from 'src/config';
import { EOrderRegistrada, EOrderRegistradaDetalle } from '../interfaces/orderHCocinero.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CocineroService {

  private endpointSomee: string ;

  constructor(private http: HttpClient) {
    this.endpointSomee = environmentSomee.endPoint
  }

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
