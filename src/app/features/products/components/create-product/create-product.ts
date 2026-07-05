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
  
  readonly PRODUCTO_INIICAL: ProductoFormModel = {
    nombre: '',
    description: '',
    imageUrl: '',
    price: 0,
  };
  
  /** Indica si el producto fue guardado correctamente. variable reactiva */
  readonly guardadoCorrectamente = signal(false);
  /** Indica si ocurrió un error en el servidor. variable reactiva */
  readonly errorServidor = signal('');
  readonly productModel =signal<ProductoFormModel>({
    //inicializamos el modelo con los valores iniciales
    ...this.PRODUCTO_INIICAL,
  });

  //agrgeamos la logica del formulario
  readonly productoForm = form(this.productModel,  
      (producto) =>{ required (producto.nombre,{
        message: 'El nombre es requerido',});

      }

   );
 
  limpiarFormulario() :void {
    
  }
  
  cerrarMensaje() :void {
    //cambiamos el valor a false para que el mensaje de guardado correcto desaparezca
    this.guardadoCorrectamente.set(false);
  }
}