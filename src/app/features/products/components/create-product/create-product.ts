import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, min, required } from '@angular/forms/signals';
import type { EstadoProducto, ProductoFormModel } from '../../domain/product.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormField, FormRoot],
  templateUrl: './create-product.html',
  styleUrls: ['./create-product.css'],
})
export class CreateProduct {

  readonly PRODUCTO_INICIAL: ProductoFormModel = {
    nombre: '',
    sku: '',
    codigoBarras: '',
    categoria: '',
    marca: '',
    precio: 0,
    costo: 0,
    stock: 0,
    stockMinimo: 0,
    unidad: 'Pieza',
    proveedor: '',
    estado: 'activo',
    descripcion: '',
  };
   readonly categorias = [
    'Electrónica',
    'Hogar',
    'Papelería',
    'Ropa',
    'Alimentos',
    'Accesorios',
    'Herramientas',
    'Otros',
  ];

  readonly unidades = [
    'Pieza',
    'Caja',
    'Paquete',
    'Kilogramo',
    'Gramo',
    'Litro',
    'Mililitro',
    'Metro',
  ];
  readonly estados: ReadonlyArray<{
    value: EstadoProducto;
    label: string;
  }> = [
    {
      value: 'activo',
      label: 'Activo',
    },
    {
      value: 'inactivo',
      label: 'Inactivo',
    },
  ];

  readonly guardadoCorrectamente = signal(false);
  readonly errorServidor = signal('');
   readonly productoModel = signal<ProductoFormModel>({
    ...this.PRODUCTO_INICIAL,
  });

  ////logica de formulario
  readonly productoForm = form(
    this.productoModel,

    (producto) => {
      required(producto.nombre, {
        message: 'El nombre del producto es obligatorio.',
      });

      maxLength(producto.nombre, 100, {
        message: 'El nombre no puede superar los 100 caracteres.',
      });

      required(producto.sku, {
        message: 'El código SKU es obligatorio.',
      });

      maxLength(producto.sku, 30, {
        message: 'El SKU no puede superar los 30 caracteres.',
      });

      maxLength(producto.codigoBarras, 50, {
        message: 'El código de barras no puede superar los 50 caracteres.',
      });

      required(producto.categoria, {
        message: 'Selecciona una categoría.',
      });

      maxLength(producto.marca, 80, {
        message: 'La marca no puede superar los 80 caracteres.',
      });

      min(producto.precio, 0.01, {
        message: 'El precio debe ser mayor que cero.',
      });

      min(producto.costo, 0, {
        message: 'El costo no puede ser negativo.',
      });

      min(producto.stock, 0, {
        message: 'La existencia no puede ser negativa.',
      });

      min(producto.stockMinimo, 0, {
        message: 'El stock mínimo no puede ser negativo.',
      });

      required(producto.unidad, {
        message: 'Selecciona una unidad.',
      });

      maxLength(producto.proveedor, 100, {
        message: 'El proveedor no puede superar los 100 caracteres.',
      });

      required(producto.estado, {
        message: 'Selecciona el estado del producto.',
      });

      maxLength(producto.descripcion, 500, {
        message: 'La descripción no puede superar los 500 caracteres.',
      });
    },

    {
      submission: {
        action: async (field) => {
          this.guardadoCorrectamente.set(false);
          this.errorServidor.set('');

          try {
            const producto = field().value();

            /*
             * Sustituye este console.log por la llamada a tu servicio.
             *
             * Ejemplo:
             *
             * await firstValueFrom(
             *   this.productoService.crearProducto(producto)
             * );
             */

            console.log('Producto que se enviará a la API:', producto);

            this.guardadoCorrectamente.set(true);

            return;
          } catch (error) {
            console.error('Error al guardar el producto:', error);

            this.errorServidor.set(
              'No fue posible guardar el producto. Intenta nuevamente.',
            );

            return {
              kind: 'serverError',
              message: 'No fue posible guardar el producto.',
            };
          }
        },

        onInvalid: (field) => {
          this.guardadoCorrectamente.set(false);

          const primerError = field().errorSummary()[0];

          primerError?.fieldTree().focusBoundControl();
        },
      },
    },
  );


  limpiarFormulario(): void {
    this.productoForm().reset({
      ...this.PRODUCTO_INICIAL,
    });

    this.guardadoCorrectamente.set(false);
    this.errorServidor.set('');
  }

  cerrarMensaje(): void {
    this.guardadoCorrectamente.set(false);
    this.errorServidor.set('');
  }
}
