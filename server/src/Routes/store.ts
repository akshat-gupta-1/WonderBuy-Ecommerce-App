import express from 'express';
import authenticate from '../middleware/authenticate';
import {
  getallStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
} from '../controllers/store';
const router = express.Router();
router
  .route('/store')
  .get(authenticate, getallStores)
  .post(authenticate, createStore);

router
  .route('/store/:id')
  .get(authenticate, getStore)
  .put(authenticate, updateStore)
  .delete(authenticate, deleteStore);
export default router;
