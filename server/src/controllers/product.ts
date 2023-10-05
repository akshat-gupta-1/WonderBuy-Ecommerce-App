import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import asyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
import { RequestUserInfo } from '../middleware/authenticate';
import uploadImage from '../Utils/uploadImage';
import Product from '../models/Product';
import Store from '../models/Store';
import { IProduct } from '../types/types';

interface CustomResquest<T> extends RequestUserInfo {
  body: T;
}

export const getProducts = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const storeId = req.params.id;
    if (user) {
      const store = await Store.findOne({ _id: storeId, owner: userId });
      if (store) {
        const products = await Product.find({ storeId });
        res.status(200).json(products);
      } else {
        throw createHttpError(404, 'Store does not exist');
      }
    } else {
      throw createHttpError(401, 'Request not allowed');
    }
  }
);
export const getProduct = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const storeId = req.params.storeId;
    const productId = req.params.productId;
    if (user) {
      const store = await Store.findOne({ _id: storeId, owner: userId });
      if (store) {
        const product = await Product.findOne({ _id: productId, storeId });
        res.status(200).json(product);
      } else {
        throw createHttpError(404, 'Store does not exist');
      }
    } else {
      throw createHttpError(401, 'Request not allowed');
    }
  }
);
export const addProduct = asyncHandler(
  async (req: CustomResquest<IProduct>, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const storeId = req.params.id;
    const { name, category, price, description, imageUrl } = req.body;
    if (user) {
      const store = await Store.findOne({ _id: storeId, owner: userId });
      if (store) {
        if (!name || !category || !price || !description || !imageUrl) {
          throw createHttpError(400, 'All fields are required');
        }
        const imagesPromise = imageUrl.map(async (image) => {
          const imageId = uuidv4().split('-')[0];
          const imageLink = await uploadImage(image, imageId);
          return imageLink;
        });
        const images = await Promise.all(imagesPromise);
        if (Array.isArray(images)) {
          images.forEach((image) => {
            if (typeof image != 'string') {
              throw createHttpError(500, 'Unknown Server Error');
            }
          });
        }
        const product = await Product.create({
          name,
          category,
          price,
          description,
          imageUrl: images,
          storeId,
        });
        res.status(201).json(product);
      } else {
        throw createHttpError(404, 'Store does not exist');
      }
    } else {
      throw createHttpError(401, 'Request not allowed');
    }
  }
);

export const editProduct = asyncHandler(
  async (req: CustomResquest<IProduct>, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const storeId = req.params.storeId;
    const productId = req.params.productId;
    if (user) {
      const store = await Store.findOne({ _id: storeId, owner: userId });
      if (store) {
        if (req.body.imageUrl) {
          const imagesPromise = req.body.imageUrl.map(async (image) => {
            const imageId = uuidv4().split('-')[0];
            const imageLink = await uploadImage(image, imageId);
            return imageLink;
          });
          const images = (await Promise.all(imagesPromise)) as string[];
          if (Array.isArray(images)) {
            images.forEach((image) => {
              if (typeof image != 'string') {
                throw createHttpError(500, 'Unknown Server Error');
              }
            });
          }
          req.body.imageUrl = images;
        }
        const result = await Product.findOneAndUpdate(
          {
            _id: productId,
            storeId,
          },
          { $set: req.body },
          { new: true, runValidators: true }
        );
        res.status(200).json(result);
      } else {
        throw createHttpError(404, 'Store does not exist');
      }
    } else {
      throw createHttpError(401, 'Request not allowed');
    }
  }
);

export const deleteProduct = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const storeId = req.params.storeId;
    const productId = req.params.productId;
    if (user) {
      const store = await Store.findOne({ _id: storeId, owner: userId });
      if (store) {
        await Product.deleteOne({ _id: productId, storeId });
        res.status(200).json({ message: 'Successfully deleted the Product' });
      } else {
        throw createHttpError(404, 'Store does not exist');
      }
    } else {
      throw createHttpError(401, 'Request not allowed');
    }
  }
);
