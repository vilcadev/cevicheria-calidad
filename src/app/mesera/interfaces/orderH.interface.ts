export interface OrderH {
    fechaOrden: Date;
    total: number;
    mesaId: number;
    estadoId: number;
    detalles: DetallesH[];
}

export interface DetallesH{

    platilloId: number;
    estadoId: number;
    cantidad: number;
    total: number;

}
