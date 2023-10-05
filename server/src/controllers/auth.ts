import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
dotenv.config();
export const signUpUser = asyncHandler(async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    throw createHttpError(400, 'All fields are required');
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    throw createHttpError(400, 'User email already taken');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ userName, email, password: hashedPassword });
  const resultObject = { _id: user._id };
  // const resultObject = user.toObject();
  // delete resultObject.password;
  // delete resultObject.userName;
  if (user) {
    const accessToken = jwt.sign(
      resultObject,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '14m',
      }
    );
    const refreshToken = jwt.sign(
      resultObject,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    await User.updateOne({ email }, { $set: { refreshToken: refreshToken } });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ accessToken });
  } else {
    throw createHttpError(400, 'User Data is not Valid');
  }
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw createHttpError(400, 'All fields are required');
  }
  const user = await User.findOne({ email }).select('+password');
  if (user && (await bcrypt.compare(password, user.password))) {
    const resultObject = { _id: user._id };
    // const resultObject = user.toObject();
    // delete resultObject.password;
    // delete resultObject.userName;
    const accessToken = jwt.sign(
      resultObject,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '14m',
      }
    );
    const refreshToken = jwt.sign(
      resultObject,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    await User.updateOne({ email }, { $set: { refreshToken: refreshToken } });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } else {
    throw createHttpError(401, 'Invalid Email or Password');
  }
});

export const handleRefreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      throw createHttpError(401, 'Unauthorized Access');
    }
    const token = cookies.refreshToken;
    const user = await User.findOne({ refreshToken: token });
    const resultObject = { _id: user._id };
    // const resultObject = user.toObject();
    // delete resultObject.password;
    // delete resultObject.userName;
    // delete resultObject.refreshToken;
    if (!user) {
      throw createHttpError(403, 'Invalid Refresh Token');
    }
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err: Error, decoded: JwtPayload) => {
        if (err || user._id.toString() !== decoded._id) {
          throw createHttpError(403, 'Invalid Refresh Token');
        }
        const accessToken = jwt.sign(
          resultObject,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '14m',
          }
        );
        res.json({ accessToken });
      }
    );
  }
);
export const handleLogout = asyncHandler(
  async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
      res.sendStatus(204);
    }
    const token = cookies.refreshToken;
    const user = await User.findOne({ refreshToken: token });
    const userId = user.id;
    if (!user) {
      res.clearCookie('refreshToken', { httpOnly: true });
      res.sendStatus(204);
    }
    await User.updateOne({ _id: userId }, { $unset: { refreshToken: 1 } });
    res.clearCookie('refreshToken', { httpOnly: true });
    res.sendStatus(204);
  }
);
