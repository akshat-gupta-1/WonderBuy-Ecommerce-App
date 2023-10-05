import { Schema, model } from 'mongoose';
import { IProduct, productCategories } from '../types/types';

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product Name is required'],
      maxlength: 30,
    },
    category: {
      type: String,
      required: [true, 'Product Category is required'],
      enum: productCategories,
    },
    description: {
      type: String,
      required: [true, 'Product Desciption is required'],
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: [true, 'Product Price is required'],
      min: 0,
    },
    imageUrl: {
      type: [String],
      required: [true, 'Product Image is required'],
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'store',
      required: [true, 'Product Store Id is required'],
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>('product', ProductSchema);
export default Product;
