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
  visible: boolean
  data: Record<string, any>
  title?: string
  onClose: () => void
  onSubmit?: (updatedData: Record<string, any>) => void
  readOnly?: boolean
}

const GenericModal: React.FC<GenericModalProps> = ({
  visible,
  data,
  title = "Detalle",
  onClose,
  onSubmit,
  readOnly = false,
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
          >
            {renderInput(key, value)}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )
}

export default GenericModal
