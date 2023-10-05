import express from 'express';
import authenticate from '../middleware/authenticate';
import { changePassword, deleteUser, getUserInfo } from '../controllers/user';
const router = express.Router();

router.get('/user', authenticate, getUserInfo);
router.post('/changepassword', authenticate, changePassword);
router.get('/deleteAccount', authenticate, deleteUser);
export default router;
