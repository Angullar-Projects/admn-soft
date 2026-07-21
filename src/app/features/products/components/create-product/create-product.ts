import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, min, required } from '@angular/forms/signals';
import type { ProductoFormModel } from '../../domain/product.model';
import { ProductoFacade   } from '../../application/facade/ProductoFacade';
import { Action } from 'rxjs/internal/scheduler/Action';
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
    name: '',
    description: '',
    //imageUrl: '',
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
    name: '',
    description: '',
    //imageUrl: '',
    price: 0,
  });

  //agrgeamos la logica del formulario
  readonly productoForm = form(this.productModel,  
      (producto) =>{ required (producto.name,{
        message: 'El nombre es requerido',});
      
        maxLength(producto.name, 100, {
        message: 'El nombre no puede superar los 100 caracteres.',
      });
      min(producto.price,0.01,{
        message:'El precio debe ser mayor que cero.',
      });
      maxLength(producto.description,500,{
        message: 'La descripción no puede superar los 500 caracteres.',
      });
     },
     {
      submission:{
         action: async (field)=> {   
             this.guardadoCorrectamente.set(false);
             this.errorServidor.set('');
             try{
                 this.saveProducto();
                 return;
             }
             catch (error) {
                 console.error('Error al guardar el producto:', error);
                 this.errorServidor.set('No fue posible guardar el producto. Intenta nuevamente.');
                 return {
                     kind: 'serverError',
                     message: 'No fue posible guardar el producto.',
                 };
             }

         },
         onInvalid: (field) =>{
           this.guardadoCorrectamente.set(false);
           const primerError = field().errorSummary()[0];
           primerError?.fieldTree().focusBoundControl();
         }
        }

      });
   
   resetForm():void{
       this.product.set({
        name: '',
        description: '',
        //imageUrl:'',
        price: 0
      });
   }
  

    cerrarMensaje(): void {
    this.guardadoCorrectamente.set(false);
    this.errorServidor.set('');
  }

}