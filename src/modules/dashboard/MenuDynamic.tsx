import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DashboardOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
<<<<<<< HEAD
=======
import { useAuth } from '@/auth/AuthContext'; // ✅ IMPORTAR useAuth
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)

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
<<<<<<< HEAD

  const currentUserRole = "665a1f2b40fd3a12b3e77611"; // ejemplo

=======
  const { user, token } = useAuth(); // DESTRUCTURING correcto

  // ✅ Datos temporales para pruebas (puedes usarlos mientras configuras el backend)
  /*
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
  const fakeMenuData: MenuItem[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "DashboardOutlined",
<<<<<<< HEAD
      roles: ["665a1f2b40fd3a12b3e77611"]
=======
      roles: ["admin"] // ✅ Usar roles de texto, no IDs
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
    },
    {
      title: "Usuarios",
      path: "/users",
      icon: "UserOutlined",
<<<<<<< HEAD
      roles: ["665a1f2b40fd3a12b3e77612"]
=======
      roles: ["admin"]
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
    },
    {
      title: "Reportes",
      path: "/reports",
      icon: "BarChartOutlined",
<<<<<<< HEAD
      roles: ["665a1f2b40fd3a12b3e77611", "665a1f2b40fd3a12b3e77612"]
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setMenuItems(fakeMenuData);
    }, 500);
  }, []);

  const renderMenu = () => {
    return menuItems
      .filter(item => item.roles.includes(currentUserRole))
=======
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
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
      .map(item => {
        const IconComponent = Icons[item.icon];
        return {
          key: item.path,
          icon: IconComponent ? <IconComponent /> : null,
          label: item.title,
        };
      });
  };

<<<<<<< HEAD
=======
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

>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
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

<<<<<<< HEAD
export default MenuDynamic;
=======
export default MenuDynamic;
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
