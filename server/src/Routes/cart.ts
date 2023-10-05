import express from 'express';
import authenticate from '../middleware/authenticate';
import {
  updateCart,
  getCart,
  getCartCount,
  checkOut,
} from '../controllers/cart';
const router = express.Router();
router.get('/viewCart', authenticate, getCart);
router.get('/cartCount', authenticate, getCartCount);
router.post('/updateCart', authenticate, updateCart);
router.post('/create-checkout-session', authenticate, checkOut);
export default router;
