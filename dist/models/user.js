import { model, Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date },
    status: { type: Boolean }
});
export const User = model('User', userSchema, 'user');
