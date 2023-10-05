import { Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import { RequestUserInfo } from '../middleware/authenticate';
import { v4 as uuidv4 } from 'uuid';
import uploadImage from '../Utils/uploadImage';
import Store from '../models/Store';
import { IStore } from '../types/types';
interface CustomRequest<T> extends RequestUserInfo {
  body: T;
}
export const getallStores = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    const userId = user._id;
    if (user) {
      const result = await Store.find({ owner: userId });
      res.status(200).json(result);
    } else {
      throw createHttpError(401, 'Request not allowed');
    }
  }
);
export const getStore = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const storeId = req.params.id;
    if (user) {
      const store = await Store.findOne({ _id: storeId, owner: userId });
      if (!store) {
        throw createHttpError(404, 'Store does not exist');
      }
      res.status(200).json(store);
    } else {
      throw createHttpError(401, 'Request not allowed');
    }
  }
);
export const createStore = asyncHandler(
  async (req: CustomRequest<IStore>, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const { name, location, description, logo } = req.body;
    const imageId = uuidv4().split('-')[0];
    const imageUrl = await uploadImage(logo, imageId);
    if (typeof imageUrl != 'string') {
      throw createHttpError(500, 'Unknown error occured');
    }
    if (user) {
      if (!name || !location || !description || !logo) {
        throw createHttpError(400, 'All fields are required');
      }
      const store = await Store.create({
        name,
        location,
        description,
        logo: imageUrl,
        owner: userId,
      });
      res.status(201).json(store);
    } else {
      throw createHttpError(401, 'Request not allowed');
    }
  }
);
export const updateStore = asyncHandler(
  async (req: CustomRequest<IStore>, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const storeId = req.params.id;
    if (user) {
      const store = await Store.findOne({ _id: storeId, owner: userId });
      if (store) {
        if (req.body.logo) {
          const imageId = uuidv4().split('-')[0];
          const imageUrl = await uploadImage(req.body.logo, imageId);
          if (typeof imageUrl != 'string') {
            throw createHttpError(500, 'Unknown Error occured');
          } else {
            req.body.logo = imageUrl;
          }
        }
        const result = await Store.findOneAndUpdate(
          {
            _id: storeId,
            owner: userId,
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
export const deleteStore = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const storeId = req.params.id;
    if (user) {
      const store = await Store.findOne({ _id: storeId, owner: userId });
      if (store) {
        await Store.deleteOne({ _id: storeId, owner: userId });
        res.status(200).json({ message: 'Successfully deleted the Store' });
      } else {
        throw createHttpError(404, 'Store does not exist');
      }
    } else {
      throw createHttpError(401, 'Request not allowed');
    }
  }
);
