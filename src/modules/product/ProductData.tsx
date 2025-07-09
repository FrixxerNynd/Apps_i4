// ProductTable.tsx
import React, { useEffect, useState } from "react"
import { Button, Table, Tag, message } from "antd"
import type { ColumnsType } from "antd/es/table"
import GenericModal from "../modal/genericModal"

interface ProductType {
  key: string
  name: string
  description: string
  quantity: number
  status: boolean
  price: number
  createDate?: string
  deleteDate?: string
}

const ProductTable: React.FC = () => {
  const [data, setData] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const openModal = (record: any) => {
    setSelectedItem(record)
    setModalVisible(true)
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/product/product")
      const json = await response.json()
      const productList = json.products

      const formatted = productList.map((product: any) => ({
        key: product._id,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        status: product.status,
        price: product.price,
        createDate: product.createDate,
        deleteDate: product.deleteDate,
      }))

      setData(formatted)
    } catch (error) {
      console.error("Error al obtener los productos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
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
      fetchProducts()
    } catch (error) {
      message.error("No se pudo actualizar el producto")
    }
  }

  const statusFilters = [
    { text: "Disponible", value: true },
    { text: "No disponible", value: false },
  ]

  const columns: ColumnsType<ProductType> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      filters: statusFilters,
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Disponible" : "No disponible"}
        </Tag>
      ),
    },
    {
      title: "Fecha de creación",
      dataIndex: "createDate",
      key: "createDate",
      render: (date) => (date ? new Date(date).toLocaleString() : "N/A"),
    },
    {
      title: "Fecha de eliminación",
      dataIndex: "deleteDate",
      key: "deleteDate",
      render: (date) => (date ? new Date(date).toLocaleString() : "—"),
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, record) => <Button onClick={() => openModal(record)}>Editar</Button>,
    },
  ]


  return (
    <>
      <Table<ProductType> columns={columns} dataSource={data} loading={loading} />
      {selectedItem && (
        <GenericModal
          visible={modalVisible}
          data={selectedItem}
          title="Editar Producto"
          readOnly={false}
          onClose={() => setModalVisible(false)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  )
}

export default ProductTable
