// GenericModal.tsx
import React from "react"
import {
  Modal,
  Form,
  Input,
  Checkbox,
  DatePicker,
  InputNumber,
} from "antd"
import dayjs from "dayjs"

interface GenericModalProps {
  visible: boolean;
  data: Record<string, any>;
  title?: string;
  onClose: () => void;
  onSubmit?: (updatedData: Record<string, any>) => void
  readOnly?: boolean;
  type: 'user' | 'orders' | 'products'; 

}

const validationRules: Record<string, Record<string, any[]>> = {
  user: {
    name: [{ required: true, message: 'El nombre es obligatorio' }],
    email: [
      { required: true, message: 'El correo es obligatorio' },
      { type: 'email', message: 'Debe ser un correo válido' },
    ],
    password: [{ required: true, message: 'La contraseña es obligatoria' }],
    role: [{ required: true, message: 'El rol es obligatorio' }],
    phone: [
      { required: true, message: 'El teléfono es obligatorio' },
      { pattern: /^\d+$/, message: 'Solo se permiten números' },
    ],
  },
  orders: {
    productId: [{ required: true, message: 'ID de producto requerido' }],
    quantity: [
      { required: true, message: 'Cantidad obligatoria' },
      { type: 'number', min: 1, message: 'Debe ser al menos 1' },
    ],
    orderDate: [{ required: true, message: 'Fecha requerida' }],
  },
  products: {
    name: [{ required: true, message: 'Nombre del producto requerido' }],
    price: [
      { required: true, message: 'Precio requerido' },
      { type: 'number', min: 0, message: 'Debe ser mayor o igual a 0' },
    ],
    status: [{ required: true, message: 'Estado requerido' }],
  },
};


const GenericModal: React.FC<GenericModalProps> = ({
  visible,
  data,
  title = "Detalle",
  onClose,
  onSubmit,
  readOnly = false,
  type,
}) => {
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (data && visible) {
      const convertedData = { ...data }
      for (const key in convertedData) {
        if (key.toLowerCase().includes("date") && convertedData[key]) {
          convertedData[key] = dayjs(convertedData[key])
        }
      }
      form.setFieldsValue(convertedData)
    }
  }, [data, visible])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const parsedValues = { ...values }

      for (const key in parsedValues) {
        if (dayjs.isDayjs(parsedValues[key])) {
          parsedValues[key] = parsedValues[key].toISOString()
        }
      }

      onSubmit?.(parsedValues)
      onClose()
    } catch (err) {
      console.error("Validation failed:", err)
    }
  }

  const renderInput = (key: string, value: any) => {
    if (typeof value === "boolean") {
      return <Checkbox disabled={readOnly} />
    }
    if (typeof value === "number") {
      return <InputNumber disabled={readOnly} style={{ width: "100%" }} />
    }
    if (key.toLowerCase().includes("date")) {
      return <DatePicker disabled={readOnly} style={{ width: "100%" }} />
    }
    return <Input disabled={readOnly} />
  }

  return (
    <Modal
      open={visible}
      title={title}
      onCancel={onClose}
      onOk={handleOk}
      okText={readOnly ? "Cerrar" : "Guardar"}
    >
      <Form form={form} layout="vertical">
        {Object.entries(data).map(([key, value]) => (
          <Form.Item
            key={key}
            label={key}
            name={key}
            valuePropName={typeof value === "boolean" ? "checked" : "value"}
            rules={validationRules[type]?.[key] || []}
          >
            {renderInput(key, value)}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )
}

export default GenericModal
