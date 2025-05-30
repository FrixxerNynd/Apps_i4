import { Document, model, Schema, Types } from 'mongoose';

export interface IUser extends Document {
    id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: string;
    phone: string;
    createDate: Date;
    deleteDate: Date;
    status: boolean;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String },
    createDate: { type: Date, default: Date.now },
    deleteDate: { type: Date },
    status: { type: Boolean }
})

export const User = model<IUser>('User', userSchema, 'user');