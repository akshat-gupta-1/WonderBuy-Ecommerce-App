import { Schema, model } from 'mongoose';
import { ICartItem, ICart } from 'types/types';

const CartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const CartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required to access Cart'],
    },
    items: [{ _id: false, type: CartItemSchema }],
    bill: Number,
  },
  {
    timestamps: true,
  }
);

const Cart = model<ICart>('cart', CartSchema);
export default Cart;
