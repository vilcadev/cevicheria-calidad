export interface IComprobante {
    ordenId:       string;
    mesaId:        string;
    fecha:         string;
    nombreCliente: string;
    contacto:      string;
    dni:           string;
    montoTotal:    number;
    detalles:      DetalleComprobante[];
}

export interface DetalleComprobante {
    nombre:         string;
    cantidad:       number;
    precioUnitario: number;
}
