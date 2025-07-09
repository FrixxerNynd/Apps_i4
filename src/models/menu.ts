// src/config/menu.ts


export interface MenuItem {
  title: string;
  path:  string;
  icon:  string;
  roles: string[];
}

export const MENU: MenuItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: 'DashboardOutlined', roles: ['admin','user'] },
  { title: 'Usuarios',  path: '/users',     icon: 'UserOutlined',      roles: ['admin','user'] },
  { title: 'productos',  path: '/products',   icon: 'ShoppingOutlined',  roles: ['admin','user']},
  { title: 'Ordenes',    path: '/orders',   icon: 'ProfileOutlined',   roles: ['admin','user']  },
  { title: 'Configuracion',    path: '/settings',   icon: 'SettingOutlined',   roles: ['admin','user']  },
  { title: 'Reportes',    path: '/reports',   icon: 'BarChartOutlined',   roles: ['admin']  },


 
];
