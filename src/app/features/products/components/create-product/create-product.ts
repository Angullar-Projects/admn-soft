import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, min, required } from '@angular/forms/signals';
import type { ProductoFormModel } from '../../domain/product.model';
import { ProductoFacade   } from '../../application/facade/ProductoFacade';
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormField, FormRoot],
  templateUrl: './create-product.html',
  styleUrls: ['./create-product.css'],
})
export class CreateProduct {

  //inyectamos el facade para trabajar con la separacion de las capas
  readonly productoFacade = inject(ProductoFacade);

  //utilizamos un signal, tipado de ProductFormModel es un objeto que envuelve un product
  //los valores se ñeen a traves de una funcion
  readonly product = signal<ProductoFormModel>({
    nombre: '',
    description: '',
    imageUrl: '',
    price: 0,

  });
  //este metodo se asegura de unicamente trabajar con las propiedades adecuadas del object ProductoFormModel
  //de esta manera no se pueden enviar valores no validos de la propiedad.
  //field es solo una propiedad valida de productoFormModel
  updateProductField<K extends keyof ProductoFormModel>(field: K, value: ProductoFormModel[K]):void 
  {
      this.product.update(product => ({
          ...product,
          [field]:value
      }));
  }

  saveProducto():void{
    const productToSave: ProductoFormModel ={
      ...this.product()
    };
    this.productoFacade.create(productToSave);
  }

 
  
  /** Indica si el producto fue guardado correctamente. variable reactiva */
  readonly guardadoCorrectamente = signal(false);
  /** Indica si ocurrió un error en el servidor. variable reactiva */
  readonly errorServidor = signal('');
  readonly productModel = signal<ProductoFormModel>({
    nombre: '',
    description: '',
    imageUrl: '',
    price: 0,
  });

  //agrgeamos la logica del formulario
  readonly productoForm = form(this.productModel,  
      (producto) =>{ required (producto.nombre,{
        message: 'El nombre es requerido',});

      }

   );
   
   resetForm():void{
       this.product.set({
        nombre: '',
        description: '',
        imageUrl:'',
        price: 0
      });
   }
  

    cerrarMensaje(): void {
    this.guardadoCorrectamente.set(false);
    this.errorServidor.set('');
  }

}