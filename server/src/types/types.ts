import { Document, Schema } from 'mongoose';
export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  refreshToken?: string;
}
interface locationInterface {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
export interface  IStore {
  name: string;
  description: string;
  location: locationInterface;
  logo: string;
  owner: Schema.Types.ObjectId;
}
export interface IProduct {
  name: string;
  category: (typeof productCategories)[number];
  description: string;
  price: number;
  imageUrl: string[];
  storeId: Schema.Types.ObjectId;
}
export const productCategories = [
  'Furniture',
  'Electronics',
  'Fashion',
  'Books',
  'Beauty',
] as const;

export interface ICartItem {
  product: Schema.Types.ObjectId;
  quantity: number;
}
export interface ICart {
  user: Schema.Types.ObjectId;
  items: ICartItem[];
  bill: number;
}
