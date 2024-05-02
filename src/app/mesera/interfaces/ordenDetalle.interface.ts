

export interface OrdenDetalle {
    idOrden:     string;
    fecha:       Date;
    estadoOrden: number;
    mesaId:      string;
    observacion: string;
    platillos:   DetallePlatillo[];
}

export interface DetallePlatillo {
    idPlatillo:  string;
    cantidad:    number;
    nombrePlatillo: string;
    precioTotal: number;
    estado:      number;
}
