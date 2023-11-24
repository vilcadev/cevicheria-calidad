// En algún lugar de tu código, por ejemplo, en el mismo archivo de tu componente
export interface MenuResponse {
    exito: number;
    mensaje: string | null;
    data: MenuData[];
  }

  export interface MenuData {
    id: number;
    fecha: string;
    menuDetalles: MenuDetalle[];
  }

  export interface MenuDetalle {
    id: number;
    precio: number;
    platillo: Platillo;
  }

  export interface Platillo {
    id: number;
    nombre: string;
    categoriaId: number;
  }
