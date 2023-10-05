import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from 'express-async-handler';
import { Schema } from 'mongoose';
import { IUser } from '../types/types';
import User from '../models/UserModel';

export interface RequestUserInfo extends Request {
  user: IUser;
}

const authenticate = asyncHandler(
  async (req: RequestUserInfo, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw createHttpError(401, 'Unauthorized User');
    }
    if (authHeader && authHeader.startsWith('Bearer')) {
      const token = authHeader.split(' ')[1];
      try {
        const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
          _id: Schema.Types.ObjectId;
        };
        const id = userData._id;
        const user: IUser | null = await User.findById(id);
        if (user) {
          req.user = user;
        }
        next();
      } catch (err) {
        throw createHttpError(403, 'Invalid Token');
      }
    }
  }
);
export default authenticate;
