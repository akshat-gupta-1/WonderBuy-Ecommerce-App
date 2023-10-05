import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import bcypt from 'bcrypt';
import { RequestUserInfo } from '../middleware/authenticate';
import User from '../models/UserModel';
interface changePassword {
  currPassword: string;
  newPassword: string;
}
interface CustomRequest<T> extends RequestUserInfo {
  body: T;
}
export const getUserInfo = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    res.status(200).json(user);
  }
);

export const changePassword = asyncHandler(
  async (req: CustomRequest<changePassword>, res: Response) => {
    const user = req.user;
    const userId = user._id;
    const { currPassword, newPassword } = req.body;
    if (user) {
      const result = await User.findOne({ _id: userId }).select('+password');
      if (await bcypt.compare(currPassword, result.password)) {
        const resultPassword = await bcypt.hash(newPassword, 10);
        result.password = resultPassword;
        result.save();
        res.status(200).json({ message: 'Successfully updated password' });
      } else {
        throw createHttpError(401, 'Current Password Incorrect');
      }
    } else {
      throw createHttpError(404, 'User not Found');
    }
  }
);

export const deleteUser = asyncHandler(
  async (req: RequestUserInfo, res: Response) => {
    const user = req.user;
    const userId = user._id;
    if (user) {
      const result = await User.deleteOne({ _id: userId });
      res.status(200).json({ message: 'User Successfully Deleted' });
    } else {
      throw createHttpError(404, 'User not Found');
    }
  }
);
