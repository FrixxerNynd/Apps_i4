
import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.controller.ts';

const router = express.Router();

router.post('/product', createProduct);
router.get('/product', getProducts);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

export default router;