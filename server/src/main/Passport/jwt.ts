import passportJWT, { Strategy as JWTStrategy } from "passport-jwt";
import passport from "passport";
import { UserModel } from "../models/UserModel";

require("dotenv").config();

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },

    (jwtpayload: any, done: any) => {
      UserModel.findById(jwtpayload._id, (err: any, user: any) => {
        if (err) return err;
        return done(null, user);
      });
    }
  )
);
