import React, { useEffect, useState } from 'react'
import { Button, message, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import GenericModal from '../modal/genericModal'

interface UserType {
  key: string
  name: string
  email: string
  role: string
  phone: string
  createDate: string
  status: boolean
  password?: string // opcional, para edición
}

const userFieldsSchema = [
  { key: 'name', label: 'Nombre', type: 'string', required: true },
  { key: 'email', label: 'Correo electrónico', type: 'string', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  { key: 'password', label: 'Contraseña', type: 'password', required: false },
  { key: 'role', label: 'Rol', type: 'select', required: true, options: [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ] },
  { key: 'phone', label: 'Teléfono', type: 'string', required: true, pattern: /^[+]?[0-9\s\-]{7,15}$/ },
]

const UserTable: React.FC = () => {
  const [data, setData] = useState<UserType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Partial<UserType> | null>(null)

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/find')
      const json = await response.json()
      const users = json.userList

      const formatted = users.map((user: any) => ({
        key: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        createDate: user.createDate,
        status: user.status,
      }))
      setData(formatted)
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const openModalForEdit = (user: UserType) => {
    setSelectedUser(user)
    setModalVisible(true)
  }

  const openModalForNew = () => {
    setSelectedUser({ name: '', email: '', password: '', role: '', phone: '' })
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedUser(null)
  }

  const handleSave = async (userData: any) => {
    try {
      const payload = { ...userData }
      if (selectedUser?.key) {
        // Para edición, envía PUT a la API con ID
        const response = await fetch(`http://localhost:3000/api/auth/update/${selectedUser.key}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Error al actualizar usuario')
        message.success('Usuario actualizado correctamente')
      } else {
        // Para nuevo usuario, POST
        const response = await fetch('http://localhost:3000/api/auth/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Error al crear usuario')
        message.success('Usuario creado correctamente')
      }
      closeModal()
      fetchUsers()
    } catch (error) {
      console.error('Error en handleSave:', error)
      message.error('Error al guardar usuario')
    }
  }

  const nameFilters = Array.from(new Set(data.map((user) => user.name))).map((name) => ({
    text: name,
    value: name,
  }))

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
        <Button type="primary" onClick={() => openModalForEdit(record)}>
          Editar
        </Button>
      ),
    },
  ]

  return (
    <>
      <Button type="primary" onClick={openModalForNew} style={{ marginBottom: 16 }}>
        Nuevo Usuario
      </Button>
      <Table<UserType> columns={columns} dataSource={data} loading={loading} />
      {selectedUser && (
        <GenericModal
          visible={modalVisible}
          title={selectedUser.key ? 'Editar Usuario' : 'Nuevo Usuario'}
          data={selectedUser}
          fieldsSchema={userFieldsSchema}
          onClose={closeModal}
          onSubmit={handleSave}
        />
      )}
    </>
  )
}

export default UserTable
