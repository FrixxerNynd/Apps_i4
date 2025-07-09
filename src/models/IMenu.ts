import { Schema, model } from 'mongoose';


export interface IMenu extends Document {
  title: string;
  path: string;
  icon: string;
  roles: string[];
}
const menuSchema = new Schema<IMenu>({
  title: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  icon: {
    type: String,
  },
  roles: {
    type: [String],
  }
});

export const Menu = model<IMenu>('Menu', menuSchema, 'menu');
