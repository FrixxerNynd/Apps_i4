import { model, Schema } from 'mongoose';
const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    createDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pendiente', 'pagado', 'cancelado'], default: 'pendiente' }
});
export const Order = model('Order', orderSchema, 'order');
