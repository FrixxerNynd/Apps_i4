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
      const response = await fetch(`http://localhost:3000/api/product/${updatedData.key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) throw new Error("Error al actualizar el producto")

      message.success("Producto actualizado correctamente")
      fetchOrders()
    } catch (error) {
      message.error("No se pudo actualizar el producto")
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
      <Table<OrderType> columns={columns} dataSource={data} loading={loading} />
      {selectedItem && (
        <GenericModal
          visible={modalVisible}
          data={selectedItem}
          title="Editar Orden"
          readOnly={false}
          onClose={() => setModalVisible(false)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  )
}

export default OrderTable
