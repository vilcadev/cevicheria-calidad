export interface MenuI{
    fecha:string;
    detalles: Dishes[]
}

export interface Dishes {
    platilloId: number;
    price: number;
}
