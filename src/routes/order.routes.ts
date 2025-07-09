import { createOrder, updateOrderToPaid, cancelOrder, getOrders } from "../controllers/order.controller";
import express from "express";

const router = express.Router();

// Obtener todas las órdenes
router.get('/orders', getOrders);

// Crear una nueva orden
router.post('/order', createOrder);

// Actualizar estado de orden a pagado
router.put('/order/:id', updateOrderToPaid);

// Cancelar una orden
router.delete('/order/:id', cancelOrder);

export default router;