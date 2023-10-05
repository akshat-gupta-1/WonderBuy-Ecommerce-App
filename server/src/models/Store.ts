import { Schema, model } from 'mongoose';
import { IStore } from 'types/types';
const StoreSchema = new Schema<IStore>(
  {
    name: {
      type: String,
      required: [true, 'Store Name is required'],
      maxlength: 30,
    },
    description: {
      type: String,
      required: [true, 'Store Description is required'],
      maxlength: 500,
    },
    logo: {
      type: String,
      required: [true, 'Store Logo is requied'],
    },
    location: {
      type: {
        address: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
      required: [true, 'Store Address is required'],
      _id: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Store Owner Id is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Store = model<IStore>('store', StoreSchema);
export default Store;
