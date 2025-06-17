import { model, Schema } from 'mongoose';
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    price: { type: Number, required: true },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date }
});
export const Product = model('Product', productSchema, 'product');
