import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import Product from '../models/Product';
import Store from '../models/Store';
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();
  res.status(200).json(products);
});

export const getCategoryProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryName = req.params.category;
    const category =
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    const products = await Product.find({ category });
    res.status(200).json(products);
  }
);
export const searchProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const searchTerm = req.params.searchTerm;
    const results = await Product.find({
      name: { $regex: searchTerm, $options: 'i' },
    });
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(200).json([]);
    }
  }
);
export const getProductId = asyncHandler(
  async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      throw createHttpError(404, 'Product does not exist');
    }
  }
);
export const getallStores = asyncHandler(
  async (req: Request, res: Response) => {
    const stores = await Store.find();
    res.status(200).json(stores);
  }
);
