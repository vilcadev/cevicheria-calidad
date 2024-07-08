import { Injectable } from '@angular/core';

import { variable64 } from 'src/assets/64';

import * as pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment, environmentJson, environmentSomee } from 'src/config';
import { OrdenRequest, Order } from '../interfaces/order.interface';
import { Observable, catchError, map, throwError } from 'rxjs';
import { DetallesH, OrderH } from '../interfaces/orderH.interface';
import { EMesa } from '../interfaces/mesa.interface';
import { EMenu } from '../interfaces/menuI.interface';
import Swal from 'sweetalert2';
import { OrdenDetalle } from '../interfaces/ordenDetalle.interface';
import { ECategoriasMenu } from '../interfaces/categorias.interface';
import { IComprobante } from '../interfaces/comprobante.interface';

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
    private http: HttpClient, private currencyPipe:CurrencyPipe
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
    // generatePDF(mesaNombre: string, lista: any, total: any) {
    //     const content = [];
    //     const formattedDate = this.datePipe.transform(this.customDate, 'dd/MM/yyyy HH:mm:ss');

    //     const logo = { image: variable64.miVar, width: 100, alignment: 'center' };
    //     content.push(logo);
    //     content.push("\n");

    //     const title = { text: 'CEVICHERIA LA CHINITA', alignment: 'center', bold: true, fontSize: 16 };
    //     content.push(title);
    //     content.push("\n");

    //     const direction = { text: 'AV. AREQUIPA NRO 333 AREQUIPA', alignment: 'center' };
    //     content.push(direction);
    //     content.push("\n");

    //     const ruc = { text: 'R.U.C. N° 100000000001', alignment: 'center' };
    //     content.push(ruc);
    //     content.push("\n");

    //     const ticket = { text: 'TICKET DE VENTA', alignment: 'center', bold: true, fontSize: 14 };
    //     content.push(ticket);

    //     const nroTicket = { text: '#00345', alignment: 'center', bold: true, fontSize: 14 };
    //     content.push(nroTicket);
    //     content.push("\n");

    //     const time = { text: formattedDate, alignment: 'left', bold: true };
    //     content.push(time);
    //     content.push("\n");

    //     const mesa = { text: 'Mesa: ' + mesaNombre, alignment: 'left', bold: true };
    //     content.push(mesa);
    //     content.push("\n");

    //     // Crear una tabla para los platos con encabezados y bordes
    //     const platosTable = {
    //         table: {
    //             headerRows: 1,
    //             widths: ['*', 'auto', 'auto'],
    //             body: [
    //                 [
    //                     { text: 'Nombre del Plato', style: 'tableHeader', alignment: 'left' },
    //                     { text: 'Cantidad', style: 'tableHeader', alignment: 'right' },
    //                     { text: 'Precio', style: 'tableHeader', alignment: 'right' }
    //                 ],
    //                 ...lista.map(plato => [
    //                     { text: plato.nombre, alignment: 'left' },
    //                     { text: plato.cantidad, alignment: 'right' },
    //                     { text: 'S/' + plato.precioUnitario, alignment: 'right' }
    //                 ])
    //             ]
    //         },
    //         layout: 'lightHorizontalLines' // Aplicar un layout con líneas horizontales ligeras
    //     };

    //     content.push(platosTable);
    //     content.push("\n");

    //     const preciototal = { text: 'Total: S/' + total, alignment: 'right', bold: true, fontSize: 14 };
    //     content.push(preciototal);
    //     content.push("\n");

    //     const docDefinition = {
    //         content: content,
    //         styles: {
    //             tableHeader: {
    //                 bold: true,
    //                 fontSize: 12,
    //                 color: 'black'
    //             }
    //         },
    //         defaultStyle: {
    //             fontSize: 10
    //         }
    //     };

    //     pdfMake.createPdf(docDefinition).open();
    // }

    generatePDF(mesaNombre: string, lista: any, total: any) {
        const content = [];
        const formattedDate = this.datePipe.transform(this.customDate, 'dd/MM/yyyy HH:mm:ss');

        const logo = { image: variable64.miVar, width: 100, alignment: 'left' };
        const header = {
            columns: [
                logo,
                {
                    stack: [
                        { text: 'CEVICHERIA LA CHINITA', alignment: 'right', bold: true, fontSize: 16 },
                        { text: 'AV. AREQUIPA NRO 333 AREQUIPA', alignment: 'right' },
                        { text: 'R.U.C. N° 100000000001', alignment: 'right' },
                        { text: 'TICKET DE VENTA', alignment: 'right', bold: true, fontSize: 14 },
                        { text: '#00345', alignment: 'right', bold: true, fontSize: 14 },
                    ]
                }
            ]
        };

        content.push(header);
        content.push("\n");

        const subHeader = {
            columns: [
                { text: `Fecha: ${formattedDate}`, alignment: 'left', bold: true },
                { text: `Mesa: ${mesaNombre}`, alignment: 'right', bold: true }
            ]
        };
        content.push(subHeader);
        content.push("\n");

        // Tabla de Platos
        const platosTable = {
            style: 'tableExample',
            table: {
                headerRows: 1,
                widths: ['*', 'auto', 'auto'],
                body: [
                    [
                        { text: 'Nombre del Plato', style: 'tableHeader', alignment: 'left' },
                        { text: 'Cantidad', style: 'tableHeader', alignment: 'right' },
                        { text: 'Precio', style: 'tableHeader', alignment: 'right' }
                    ],
                    ...lista.map(plato => [
                        { text: plato.nombre, alignment: 'left' },
                        { text: plato.cantidad, alignment: 'right' },
                        { text: this.currencyPipe.transform(plato.precioUnitario, 'S/ ', 'symbol', '1.2-2'), alignment: 'right'}
                    ])
                ]
            },
            layout: 'lightHorizontalLines'
        };

        content.push(platosTable);
        content.push("\n");

        // Total
        const totalText = {
            columns: [
                { text: '' },
                { text: 'Total:', alignment: 'right', bold: true, margin: [0, 0, 20, 0] },
                { text: this.currencyPipe.transform(total, 'S/ ', 'symbol', '1.2-2'), alignment: 'right', bold: true }
            ]
        };

        content.push(totalText);
        content.push("\n");

        // Pie de página
        const footer = {
            columns: [
                { qr: 'https://cevicheriaLaChinita.com', fit: 100, alignment: 'left' },
                {
                    stack: [
                        { text: 'Forma de pago: Contado', alignment: 'right' },
                        { text: 'Representación impresa de la Boleta de venta electrónica.', alignment: 'right' },
                        { text: 'Consulte su documento en https://lachinita.com', alignment: 'right' }
                    ]
                }
            ]
        };

        content.push(footer);

        const docDefinition = {
            content: content,
            styles: {
                tableHeader: {
                    bold: true,
                    fontSize: 12,
                    color: 'black'
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                }
            },
            defaultStyle: {
                fontSize: 10
            }
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

    registrarComprobante(comprobante: IComprobante):Observable<any>{
        return this.http.post<any>(`${this.endpointSomee}/api/Comprobante`,comprobante).pipe(
            catchError(error => {
                Swal.fire('Error al agregar la orden',error, 'warning');
                return throwError(() => error);
            })
        );
    }


    eliminarOrden(mesaId:string):Observable<any>{
        return this.http.delete<any>(`${this.endpointSomee}/api/Orden/${mesaId}`).pipe(
            map(response => response.response.isSuccess),
            catchError(error => {
              Swal.fire('Error', error, 'warning');
              throw error;
            })
          );
    }





}
