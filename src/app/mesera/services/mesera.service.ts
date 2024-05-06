import { Injectable } from '@angular/core';

import { variable64 } from 'src/assets/64';

import * as pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment, environmentJson, environmentSomee } from 'src/config';
import { OrdenRequest, Order } from '../interfaces/order.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { DetallesH, OrderH } from '../interfaces/orderH.interface';
import { EMesa } from '../interfaces/mesa.interface';
import { EMenu } from '../interfaces/menuI.interface';
import Swal from 'sweetalert2';
import { OrdenDetalle } from '../interfaces/ordenDetalle.interface';
import { ECategoriasMenu } from '../interfaces/categorias.interface';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class MeseraService {

    private endpoint: string ;
    private miapiUrl: string ;

    private miapiUrlOrden: string ;

    private endpointSomee: string ;


    // ****** Environment JSON **
    private endpointJson:string;
    private miapiUrlJson:string;

    public customDate:Date = new Date();


  constructor(private datePipe: DatePipe,
    private http: HttpClient
    )
    {
     this.endpoint = environment.endPoint
     this.endpointSomee = environmentSomee.endPoint
     this.miapiUrl = this.endpoint+"api/Menu/"
     this.miapiUrlOrden = this.endpoint+"api/Orden/"

    //  ***********Api JSON
    this.endpointJson = environmentJson.endPoint;
    this.miapiUrlJson = this.endpointJson
    }

    // Obtener Menu del Día
    obtenerMenu(){
        const response = this.http.get(`${this.miapiUrl}getMenu?fecha=2024-04-29`);
        return response;
    }

     // Agregar Orden
    agregarOrden(data: Order): Observable<any>{

        console.log("Todo Correcto")
        console.log({data});
        const response = this.http.post(`${this.miapiUrlJson}`,data);
        return response;
    }



    // Agregar Orden H
    agregarOrdenH(data: OrderH): Observable<any>{
        console.log("Todo Correcto Orden H");
        console.log({data});

        const response = this.http.post(`${this.miapiUrlOrden}createOrden`,data,{ responseType: 'text' })
        return response;
    }

    cancelarOrden(ordenId:number){
        const response = this.http.delete(`${this.miapiUrlOrden}eliminarOrden/${ordenId}`);
        return response;
    }

    actualizarOrden(idOrden: string, data:DetallesH){

        const response = this.http.patch(`${this.miapiUrlOrden}addDetalle/${idOrden}`,data);
        return response;
    }
    //Funcionalidad generar PDF Angular:
    generatePDF( mesaNombre: string, lista: any){

        const content = [];
        const formattedDate = this.datePipe.transform(this.customDate, 'dd/MM/yyyy HH:mm:ss');

        const logo = {image:variable64.miVar,width: 100, alignment: 'center' };
        content.push(logo);
        content.push("\n");

        const title = {text: 'CEVICHERIA LA CHINITA', width:100, alignment:'center', bold:true};
        content.push(title);
        content.push("\n");

        const direction = {text: 'AV. AREQUIPA NRO 333 AREQUIPA', width:100, alignment:'center'};
        content.push(direction);
        content.push("\n");

        const ruc = {text: 'R.U.C. N° 100000000001', width:100, alignment:'center'};
        content.push(ruc);
        content.push("\n");

        const ticket = {text: 'TICKET DE VENTA', width:100, alignment:'center', bold:true};
        content.push(ticket);

        const nroTicket = {text: '#00345', width:100, alignment:'center', bold:true};
        content.push(nroTicket);


        const time = {text:formattedDate, width:100, alignment:'left', bold:true};
        content.push(time);
        content.push("\n");

        // const hr = {text: '_________________________________________________', width:100, alignment:'center', bold:true};
        // content.push(hr);

        const mesa = {text:mesaNombre, width:100, alignment:'left', bold:true};
        content.push(mesa);
        content.push("\n");

        // Crear una tabla para los platos con encabezados y sin líneas alrededor de las celdas
        const platosTable = {
            table: {
            body: [
                // Encabezados de la tabla
                [
                { text: 'Nombre del Plato', style: 'tableHeader', alignment: 'left' },
                { text: 'Cantidad', style: 'tableHeader', alignment: 'left' },
                { text: 'Precio', style: 'tableHeader', alignment: 'left' }
                ],
                // Datos de los platos
                ...lista.map(plato => [
                { text: plato.nombre, alignment: 'left' },
                { text: plato.cantidad, alignment: 'left' },
                { text: plato.precio, alignment: 'left' }
                ])
            ],
            headerRows: 1,
            widths: ['*', '*','*'], // Definir el ancho de las columnas según sea necesario
            border: [], // Configurar sin bordes alrededor de las celdas
            },
            layout: {
            defaultBorder: false, // No mostrar bordes por defecto
            },
        };

        content.push(platosTable);

        const docDefinition ={
            content : content

        };

        pdfMake.createPdf(docDefinition).open();


    }


    //****************************************************
    obtenerMesasSomee():Observable<EMesa[]>{
        return this.http.get<EMesa[]>(`${this.endpointSomee}/api/Mesa`);
    }

    obtenerMesaInfoSomee(idMesa: string):Observable<EMesa>{
        return this.http.get<EMesa>(`${this.endpointSomee}/api/Mesa/GetInfoMesa?idMesa=${idMesa}`);
    }


    obtenerMenuSomee(fecha: string):Observable<EMenu[]>{
        return this.http.get<EMenu[]>(`${this.endpointSomee}/api/Menu?fecha=${fecha}`);
    }

    agregarOrdenSomee(orden:OrdenRequest):Observable<any>{
        return this.http.post<any>(`${this.endpointSomee}/api/orden`,orden).pipe(
            catchError(error => {
                Swal.fire('Error al agregar la orden',error, 'warning');
                return throwError(() => error);
            })
        );
    }



    obtenerOrdenSomee(mesaId:string):Observable<OrdenDetalle>{
        return this.http.get<OrdenDetalle>(`${this.endpointSomee}/api/Orden/GetOrderMesa?id=${mesaId}`);
    }


    obtenerCategoriasMenuSomee(fecha: string):Observable<ECategoriasMenu[]>{
        return this .http.get<ECategoriasMenu[]>(`${this.endpointSomee}/api/Menu/categoriasMenu?fecha=${fecha}`);
    }
    obtenerPlatillosPorCategoriaSomee(fecha: string, categoriaId:string):Observable<EMenu[]>{
        return this .http.get<EMenu[]>(`${this.endpointSomee}/api/Menu/PlatillosPorCategoria?fecha=${fecha}&categoriaId=${categoriaId}`);
    }





}
