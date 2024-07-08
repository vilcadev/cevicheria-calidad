export interface OrderHCocinero {
    id: number;
    fechaOrden: Date;
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


 export interface EOrderRegistrada {
    idOrden:          string;
    fecha:            Date;
    estadoOrden:      number;
    mesaId:           string;
    nombreMesa:             null;
    observacion:      string;
    ordenesPlatillos: null;
}





export interface EOrderRegistradaDetalle {
    idOrden:     string;
    fecha:       Date;
    estadoOrden: number;
    nombreMesa:      string;
    observacion: string;
    platillos:   Platillo[];
}

export interface Platillo {
    idPlatillo:     string;
    nombrePlatillo: string;
    cantidad:       number;
    precioTotal:    number;
    estado:         number;
}


