export interface OrderH {
    fechaOrden: string;
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
