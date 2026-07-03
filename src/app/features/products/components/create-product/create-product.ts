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



  cerrarMensaje(){
    console.log('cerrar mensaje');
  }
}