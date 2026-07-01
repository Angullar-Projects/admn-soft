import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout.component').then(
        (component) => component.MainLayoutComponent,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        title: 'Inicio',
        data: { breadcrumb: 'Inicio' },
        loadComponent: () =>
          import('./features/home/home.page').then((component) => component.HomePage),
      },
      {
        path:'products',
        title:'productos',
        
      },
    ],
  },
  {
    path: '**',
    title: 'Pagina no encontrada',
    loadComponent: () =>
      import('./features/not-found/not-found.page').then(
        (component) => component.NotFoundPage,
      ),
  },
];
