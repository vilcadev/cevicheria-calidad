export interface RootObject {
    data:    Datum[];
    exito:   number;
    mensaje: null;
   }
   
   export interface Datum {
    detalleOrdenes: DetalleOrdene[];
    fecha:          Date;
    id:             number;
    mesa:           number;
    ordenEstado:    string;
    total:          number;
   }
   
   export interface DetalleOrdene {
    estadoPlatilloOrden: string;
    id:                  number;
    menuDetalle:         MenuDetalle;
   }
   
   export interface MenuDetalle {
    id:     number;
    nombre: string;
    precio: number;
   }

   
   