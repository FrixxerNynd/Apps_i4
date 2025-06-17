import { createOrder, updateOrderToPaid, cancelOrder } from "../controllers/order.controller";
import express from "express";

const router = express.Router();

router.post('/order', createOrder);
router.put('/order/:id', updateOrderToPaid);
router.delete('/order/:id', cancelOrder);

export default router;