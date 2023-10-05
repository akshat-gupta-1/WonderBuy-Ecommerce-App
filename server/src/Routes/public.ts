import express from 'express';
import {
  getProducts,
  getCategoryProducts,
  getProductId,
  searchProduct,
  getallStores,
} from '../controllers/public';
const router = express.Router();

router.get('/getProducts', getProducts);
router.get('/categories/:category', getCategoryProducts);
router.get('/product/:productId', getProductId);
router.get('/search/:searchTerm', searchProduct);
router.get('/allStores', getallStores);
export default router;
