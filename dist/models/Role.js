import { model, Schema } from 'mongoose';
const roleSchema = new Schema({
    type: { type: String, required: true, unique: true }
});
export const Role = model('Role', roleSchema, 'role');
