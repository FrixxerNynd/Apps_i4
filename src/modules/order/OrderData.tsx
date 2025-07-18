import React, { useEffect, useState } from "react"
import { Button, message, Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"
import GenericModal from "../modal/genericModal"


interface OrderType {
  key: string
  user: string // ID del usuario
  subtotal: number
  total: number
  createDate: string
  status: "pendiente" | "pagado" | "cancelado"
}

const OrderTable: React.FC = () => {
  const [data, setData] = useState<OrderType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)


  const openModal = (record: any) => {
    setSelectedItem(record)
    setModalVisible(true)
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/order/orders")
      const orderList = await response.json()

      const formatted: OrderType[] = orderList.map((order: any) => ({
        key: order._id,
        user: order.user,
        subtotal: order.subtotal,
        total: order.total,
        createDate: order.createDate,
        status: order.status,
      }))

      setData(formatted)
    } catch (error) {
      console.error("Error al obtener las órdenes:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleUpdate = async (updatedData: Record<string, any>) => {
    try {
      const response = await fetch(`http://localhost:3000/api/order/${updatedData.key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) throw new Error("Error al actualizar la orden")

      message.success("Orden actualizada correctamente")
      fetchOrders()
    } catch (error) {
      message.error("No se pudo actualizar la orden")
    }
  }

  const handleCreate = async (newData: Record<string, any>) => {
    try {
      const response = await fetch("http://localhost:3000/api/order/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      })
      if (!response.ok) throw new Error("Error al crear la orden")
      message.success("Orden creada correctamente")
      fetchOrders()
      setModalVisible(false)
    } catch (error) {
      message.error("No se pudo crear la orden")
    }
  }

  const statusColors: Record<OrderType["status"], string> = {
    pendiente: "orange",
    pagado: "green",
    cancelado: "red",
  }

  const columns: ColumnsType<OrderType> = [
    {
      title: "Usuario (ID)",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: "Fecha de creación",
      dataIndex: "createDate",
      key: "createDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>,
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, record) => <Button onClick={() => openModal(record)}>Editar</Button>,
    },
  ]

  
  
    return (
    <>
      <Button type="primary" onClick={() => openModal(null)} style={{ marginBottom: 16 }}>
        Nueva Orden
      </Button>
      <Table<OrderType> columns={columns} dataSource={data} loading={loading} />
      {modalVisible && (
        <GenericModal
          visible={modalVisible}
          data={selectedItem || { user: "", subtotal: 0, total: 0 }}
          title={selectedItem ? "Editar Orden" : "Nueva Orden"}
          readOnly={false}
          onClose={() => setModalVisible(false)}
          onSubmit={selectedItem ? handleUpdate : handleCreate}
          type="orders"
        />
      )}
    </>
  )};

export default OrderTable
