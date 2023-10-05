import { Response } from 'express';
import { RequestUserInfo } from '../middleware/authenticate';
import asyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { ICart, ICartItem, IProduct } from '../types/types';
dotenv.config();
interface CustomRequest<T> extends RequestUserInfo {
  body: T;
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});
export const getCart = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    const userId = user._id;
    if (user) {
      const cart = await Cart.findOne({ user: userId }).populate(
        'items.product'
      );
      if (!cart) {
        const newCart = Cart.create({ user, items: [], bill: 0 });
        res.status(200).json(newCart);
      } else {
        res.status(200).json(cart);
      }
    } else {
      throw createHttpError(404, 'User not found');
    }
  }
);
export const updateCart = asyncHandler(
  async (req: CustomRequest<ICartItem>, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const { product, quantity } = req.body;
    if (user) {
      const cart = await Cart.findOne({ user: userId });
      const productDetails = await Product.findOne({ _id: product });
      if (!productDetails) {
        throw createHttpError(404, 'Product not found');
      }
      if (!cart) {
        const item = [{ product, quantity: quantity }];
        const result = await Cart.create({
          user: userId,
          items: item,
          bill: productDetails.price * quantity,
        });
        res.status(201).json(result);
      } else {
        const indexFound = cart.items.findIndex(
          (item) => item.product == product
        );
        if (indexFound !== -1 && quantity === 0) {
          const deletedQuantity = cart.items[indexFound].quantity;
          cart.items.splice(indexFound, 1);
          if (cart.items.length === 0) {
            cart.bill = 0;
          } else {
            cart.bill -= deletedQuantity * productDetails.price;
          }
        } else if (indexFound !== -1) {
          cart.items[indexFound].quantity += quantity;
          if (cart.items[indexFound].quantity === 0) {
            cart.items.splice(indexFound, 1);
          }
          cart.bill += quantity * productDetails.price;
        } else if (quantity > 0) {
          cart.items.push({ product, quantity });
          cart.bill += productDetails.price * quantity;
        } else {
          throw createHttpError(400, 'Invalid Request');
        }
        const resultCart = await cart.save();
        res.status(201).json(resultCart);
      }
    } else {
      throw createHttpError(404, 'User not found');
    }
  }
);
export const getCartCount = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const cart = await Cart.findOne({ user: userId });
    const cartCount = cart.items.length;
    res.status(200).json(cartCount);
  }
);
export const checkOut = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    const userId = user._id;
    if (user) {
      const cart = await Cart.findOne({ user: userId })
        .populate<{ items: { product: IProduct; quantity: number }[] }>({
          path: 'items.product',
          select: 'price name imageUrl',
        })
        .exec();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: cart.items.map((item) => {
          return {
            price_data: {
              currency: 'inr',
              product_data: {
                name: item.product.name,
                images: item.product.imageUrl,
              },
              unit_amount: item.product.price * 100,
            },
            quantity: item.quantity,
          };
        }),
        customer_email: user.email,
        shipping_address_collection: {
          allowed_countries: ['IN'],
        },
        success_url: `${process.env.CLIENT_URL}/order/success?session_id={CHECKOUT_SESSION_ID}}`,
        cancel_url: `${process.env.CLIENT_URL}/order/cancel`,
      });
      res.json({ url: session.url });
    } else {
      throw createHttpError(404, 'User not Found');
    }
  }
);
