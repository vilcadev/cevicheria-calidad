import { Injectable } from '@angular/core';

import { variable64 } from 'src/assets/64';

import * as pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/config';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class MeseraService {

    private endpoint: string ;
    private miapiUrl: string ;

    public customDate:Date = new Date();

  constructor(private datePipe: DatePipe,
    private http: HttpClient
    )
    {
     this.endpoint = environment.endPoint
     this.miapiUrl = this.endpoint+"api/Menu/"
    }

    // Obtener Menu del Día
    obtenerMenu(){
        const response = this.http.get(`${this.miapiUrl}getMenu?fecha=2023-11-21T00%3A00%3A00`);
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

}
