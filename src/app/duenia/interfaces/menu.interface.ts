export interface Menu{
    fecha:string;
    dishes: Dishes[]
}

export interface Dishes {
    name: string;
    price: number;
}
