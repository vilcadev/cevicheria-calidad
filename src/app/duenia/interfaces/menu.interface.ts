export interface MenuI{
    fecha:string;
    detalles: Dishes[]
}

export interface Dishes {
    platilloId: number;
    precio: number;
}




export interface Menu {

    nombre: string;
    precioUnitario:number;

}


export interface MenuRequest {
    fecha: string;
    platillo: PlatilloRequest[];
  }


  export interface PlatilloRequest {
    idPlatillo: string;
    precioUnitario: number;
  }
