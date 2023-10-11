import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import connectDb from './Utils/db';
import { errorHandler } from './middleware/errorHandler';

//Importing Routers
import publicRoutes from './Routes/public';
import authRoutes from './Routes/auth';
import googleAuthRoutes from './Routes/googleAuth';
import userRoutes from './Routes/User';
import storeRoutes from './Routes/store';
import productRoutes from './Routes/product';
import cartRoutes from './Routes/cart';

const app = express();
const PORT = 5000 || process.env.PORT;
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.text({ limit: '200mb' }));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Routes
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', googleAuthRoutes);
app.use('/api', userRoutes);
app.use('/api', storeRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
//Error Handler
app.use(errorHandler);
connectDb();
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export default app;
