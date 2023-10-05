import { Schema, model } from 'mongoose';
import { IUser } from '../types/types';
const UserSchema = new Schema<IUser>(
  {
    userName: { type: String, required: [true, 'Required field'] },
    email: {
      type: String,
      required: [true, 'Required field'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Required field'],
      select: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('user', UserSchema);
export default User;
