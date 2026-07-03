export type EstadoProducto = 'activo' | 'inactivo';

export interface ProductoFormModel{
    nombre: string;
    description: string;
    imageUrl:string;
    price:number;
}


/*
sku: string;
    codigoBarras: string;
    categoria: string;
    marca: string;
    precio: number;
    costo: number;
    stock: number;
    stockMinimo: number;
    unidad: string;
    proveedor: string;
    estado: EstadoProducto;
*/