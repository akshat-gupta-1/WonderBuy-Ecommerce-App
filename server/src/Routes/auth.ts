import express from 'express';
import {
  signUpUser,
  loginUser,
  handleRefreshToken,
  handleLogout,
} from '../controllers/auth';
const router = express.Router();
router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.get('/refresh', handleRefreshToken);
router.get('/logout', handleLogout);

export default router;
