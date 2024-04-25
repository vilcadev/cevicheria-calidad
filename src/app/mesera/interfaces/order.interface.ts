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
    platillo: Platillo;
    cantidad: number;
    total: number;
    estado: number;
  }
  export interface Platillo{
    id: number;
    nombre:string;
  }


  export interface OrdenRequest {
    fecha:    string;
    mesaId: string;
    observacion: string;
    orden: PlatilloRequest[];
}

export interface PlatilloRequest {
    idPlatillo:     string;
    cantidad: number;
    precioTotal: number;
}

export interface EPlatilloM {
    idPlatillo:     string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    precioTotal: number;
}

