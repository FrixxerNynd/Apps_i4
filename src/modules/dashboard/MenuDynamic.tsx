import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useAuth } from '@/auth/AuthContext'; // ✅ IMPORTAR useAuth

const Icons = {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
};

interface MenuItem {
  title: string;
  path: string;
  icon: keyof typeof Icons;
  roles: string[];
}

const MenuDynamic = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAuth(); // DESTRUCTURING correcto

  // ✅ Datos temporales para pruebas (puedes usarlos mientras configuras el backend)
  /*
  const fakeMenuData: MenuItem[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "DashboardOutlined",
      roles: ["admin"] // ✅ Usar roles de texto, no IDs
    },
    {
      title: "Usuarios",
      path: "/users",
      icon: "UserOutlined",
      roles: ["admin"]
    },
    {
      title: "Reportes",
      path: "/reports",
      icon: "BarChartOutlined",
      roles: ["admin", "user"]
    }
  ];
  */

  useEffect(() => {
    const getMenu = async () => {
      try {
        // ✅ Opción 1: Usar datos del backend
          const response = await fetch(`http://localhost:3000/api/menu/menus?role=${user.roles}`, {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // ✅ Enviar token en headers, no en body
            }
        });
        
        if (!response.ok) {
          throw new Error('Error al obtener el menú');
        }
        
        const menuList = await response.json();
        setMenuItems(menuList);

        /*
        // ✅ Opción 2: Usar datos temporales (para que funcione ahora)
        setMenuItems(fakeMenuData);
        */
      } catch (error) {
        console.error('Error al cargar el menú:', error);
        // ✅ Fallback: usar datos temporales si falla el backend
        //setMenuItems(fakeMenuData);
      }
    };

    // ✅ Solo ejecutar si el usuario está autenticado
    if (user && token) {
      getMenu();
    }
    
  }, [user, token]);

  const renderMenu = () => {
    if (!user || !user.roles) {
      return [];
    }

    return menuItems
      .filter(item => {
        // ✅ Verificar si el usuario tiene al menos uno de los roles requeridos
        const userRoles = Array.isArray(user.roles) ? user.roles : [user.roles];
        return item.roles.some(role => userRoles.includes(role));
      })
      .map(item => {
        const IconComponent = Icons[item.icon];
        return {
          key: item.path,
          icon: IconComponent ? <IconComponent /> : null,
          label: item.title,
        };
      });
  };

  // ✅ Loading state mientras se carga el usuario
  if (!user) {
    return (
      <Menu
        theme="dark"
        mode="inline"
        style={{ height: '100%', borderRight: 0 }}
        items={[{ key: 'loading', label: 'Cargando...', disabled: true }]}
      />
    );
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key)}
      items={renderMenu()}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
};

export default MenuDynamic;