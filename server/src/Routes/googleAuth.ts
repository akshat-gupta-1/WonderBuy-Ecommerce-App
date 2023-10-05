import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import passport from 'passport';
require('../controllers/googleAuth');
const router = express.Router();
router.use(passport.initialize());
router.get('/login', (req: Request, res: Response) => {
  res.send(`
  <html>
    <body>
      <a href="http://localhost:5000/api/google">Sign in with Google</a>
    </body>
  </html>
  `);
});
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);
router.get('/hello', (req: Request, res: Response) => {
  res.send('Hello');
});
router.get('/failure', (req: Request, res: Response) => {
  res.send('Something went wrong');
});
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    session: false,
  }),
  (req: Request, res: Response) => {}
);
export default router;
