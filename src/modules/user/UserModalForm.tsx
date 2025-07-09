import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
const { Option } = Select;


export default function UserModalForm(
    {
     visible,
     message,
     onClose,
     onSave,
     user,
     

}:{
    visible: boolean;
    message: string;
    onClose: () => void;
    onSave: (user: any) => void;
    user: any;
}) {
    const [form] = Form.useForm();

        useEffect(() => {
            if(visible){
                form.setFieldsValue(user)
            }
        }, [visible, user, form]);
        const handleOk = async () => {
            try {
                const values = await form.validateFields();
                onSave(values);
            } catch (error){
                console.log('Error en el formulario', error);
            }
        };
    return (
    <Modal
    title={message}
    open={visible}
    onOk={handleOk}
    onCancel={onClose}
    >
        <Form form={form} layout="vertical">
            <Form.Item
                name="name"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor, ingresa el nombre' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Por favor, ingresa el email' },
                    { type: 'email', message: 'Por favor ingresa un email válido' }
                ]}
            >
                <Input type="email" />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Teléfono"
                rules={[{ required: true, message: 'Por favor, ingresa el teléfono' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="role"
                label="Rol"
                rules={[{ required: true, message: 'Por favor, selecciona un rol' }]}
            >
                <Select>
                    <Option value="admin">Administrador</Option>
                    <Option value="user">Usuario</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="status"
                label="Estado"
                valuePropName="checked"
            >
                <Switch checkedChildren="Activo" unCheckedChildren="Inactivo" />
            </Form.Item>
        </Form>
    </Modal>
    )
}    