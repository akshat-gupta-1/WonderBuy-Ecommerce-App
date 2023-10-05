import express from 'express';
import authenticate from '../middleware/authenticate';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from '../controllers/product';

const router = express.Router();
router
  .route('/store/:id/product')
  .get(authenticate, getProducts)
  .post(authenticate, addProduct);

router
  .route('/store/:storeId/product/:productId')
  .get(authenticate, getProduct)
  .put(authenticate, editProduct)
  .delete(authenticate, deleteProduct);
export default router;
