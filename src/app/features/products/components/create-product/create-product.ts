import { Component, signal } from '@angular/core';
import {form, FormField, FormRoot, maxLength,min, required } from '@angular/forms/signals';

type EstadoProducto = 'activo | inactivo';

@Component({
  selector: 'app-create-product',
  imports: [],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css',
})
export class CreateProduct {}
