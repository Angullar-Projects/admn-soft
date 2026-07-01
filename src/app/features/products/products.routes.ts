import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [{
    path:'create',
    loadComponent: () => import('./components/create-product/create-product')
    .then((component) => component.CreateProduct),
}];