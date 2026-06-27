import { NavigationItem } from '../models/navigation-item.model';

export const APP_NAVIGATION: readonly NavigationItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    icon: 'IN',
    route: '/home',
    section: 'Menu',
  },
  {
    id: 'platform',
    label: 'Plataforma',
    icon: 'PL',
    section: 'Base',
    children: [
      {
        id: 'platform-overview',
        label: 'Overview',
        icon: 'OV',
        route: '/home',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Configuracion',
    icon: 'CF',
    section: 'Sistema',
    children: [
      {
        id: 'settings-general',
        label: 'General',
        icon: 'GE',
        route: '/home',
      },
    ],
  },
];
