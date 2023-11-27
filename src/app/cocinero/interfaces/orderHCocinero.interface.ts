export interface OrderHCocinero {
    id: number;
    fechaOrden: string;
    total: number;
    mesa: Mesa;
    estado: Estado;
    detalleOrden: DetalleOrden[];
  }
  export interface Mesa {
    id: number;
    nombre: string;
  }
  export interface Estado {
    id: number;
    nombre: string;
  }
  export interface DetalleOrden {
    id: number;
    cantidad: number;
    total: number;
    platillo: {
      id: number;
      nombre: string;
      categoriaId: number;
    };
    estado: {
      id: number;
      nombre: string;
    };
  }
