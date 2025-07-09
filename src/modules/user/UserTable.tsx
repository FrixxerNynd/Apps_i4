import React, { useEffect, useState } from 'react';
import { Button, Table, Tag } from 'antd';
import UserModalForm from './UserModalForm';
import type { ColumnsType } from 'antd/es/table';

// Definir el tipo de usuario
interface UserType {
  key: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  createDate: string;
  status: boolean;
}

const UserTable: React.FC = () => {
  const [data, setData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);


  const handleEdit = (user: any) => {
    console.log('Editar usuario:', user);
    setVisible(true);
    setUser(user);
  };

  const closeModal = () => { setVisible(false); };

  const saveData = (user: any) => {
    console.log('Guardando usuario:', user);
    // Aquí deberías hacer la llamada a la API para actualizar el usuario
    closeModal();
  };

  // Función para obtener usuarios desde la API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/find');
      const json = await response.json();
      const users = json.userList;

      const formatted = users.map((user: any) => ({
        key: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        createDate: user.createDate,
        status: user.status,
      }));

      setData(formatted);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Generar filtros únicos por nombre (evita duplicados)
  const nameFilters = Array.from(
    new Set(data.map((user) => user.name))
  ).map((name) => ({
    text: name,
    value: name,
  }));

  // Definir columnas de la tabla con filtro por nombre
  const columns: ColumnsType<UserType> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      filters: nameFilters,
      onFilter: (value, record) => record.name.includes(value as string),
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color={role === 'admin' ? 'volcano' : 'blue'}>{role}</Tag>,
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Fecha de creación',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) =>
        status ? <Tag color="green">Activo</Tag> : <Tag color="red">Inactivo</Tag>,
    },
    {
        title: 'Acciones',
        key: 'actions',
        render: (_, record) => (
                <Button type="primary" onClick={() => handleEdit(record)}>
                    Editar
                </Button>
        ),
    },
  ];

  return (
    <>
      <Table<UserType> columns={columns} dataSource={data} loading={loading} />
      <UserModalForm
        visible={visible}
        message={user ? 'Editar Usuario' : 'Nuevo Usuario'}
        onClose={closeModal}
        onSave={saveData}
        user={user}
      />
    </>
  );
};

export default UserTable;
