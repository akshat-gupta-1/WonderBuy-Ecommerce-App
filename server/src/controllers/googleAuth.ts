import passport from 'passport';
import googleStratergy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../models/UserModel';
dotenv.config();
passport.use(
  new googleStratergy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/google/callback',
      // passReqToCallback:true,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      callback: any
    ) => {
      const email = profile.emails[0].value;
      console.log(email);
      if (!email) {
        throw createHttpError(400, 'Login Failed');
      }
      const existingUser = await User.findOne({ email });
      // if (existingUser) {
      //   const accessToken = jwt.sign(
      //     resultObject,
      //     process.env.ACESS_TOKEN_SECRET,
      //     { expiresIn: '14m' }
      //   );
      if (existingUser) {
        const resultObject = existingUser?.toObject();
        delete resultObject.password;
        return callback(null, resultObject);
      } else {
        const createUser = new User({
          userName: profile.displayName,
          email,
        });
        createUser.save({ validateBeforeSave: false });
        return callback(null, createUser);
      }
    }
  )
);

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});
passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});
