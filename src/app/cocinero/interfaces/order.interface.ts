export interface RootObject {
    data:    Datum[];
    exito:   number;
    mensaje: null;
   }

   export interface Datum {
    detalleOrdenes: DetalleOrden[];
    fecha:          string;
    id:             number;
    mesa:           number;
    ordenEstado:    string;
    total:          number;
   }

   export interface DetalleOrden {
    estadoPlatilloOrden: string;
    id:                  number;
    menuDetalle:         MenuDetalle;
   }

   export interface MenuDetalle {
    id:     number;
    nombre: string;
    precio: number;
   }


