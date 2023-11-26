// orden.interface.ts

export interface Order {
    id: number;
    idMesa: number;
    fecha: string;
    idEstado: number;
    MontoTotal: number;
    detalle_orden: DetalleOrden[];
  }

  export interface DetalleOrden {
    idDetalle: number;
    idOrden: number;
    idPlatillo: number;
    cantidad: number;
    total: number;
    estado: number;
  }
