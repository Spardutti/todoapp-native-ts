import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },

    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });
        if (!user) return done(null, false);

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) return done(null, user);
          else return done(null, false);
        });
      } catch (error) {
        return error;
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});
