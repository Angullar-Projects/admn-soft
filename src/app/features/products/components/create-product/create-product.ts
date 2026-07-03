import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, min, required } from '@angular/forms/signals';
import type { EstadoProducto, ProductoFormModel } from '../../domain/product.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports:[],  //imports: [FormField, FormRoot],
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
  readdonlyproductModel =signal<ProductoFormModel>({
    ...this.PRODUCTO_INIICAL,
  });

 
  limpiarFormulario() :void {
    
  }
  
  cerrarMensaje() :void {
    //cambiamos el valor a false para que el mensaje de guardado correcto desaparezca
    this.guardadoCorrectamente.set(false);
  }
}