import { UserModel } from "../../models/UserModel";
import passport from "passport";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import async from "async";
import jwt from "jsonwebtoken";
require("dotenv").config();

/* CREATE NEW USER */
const newUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body.data;
  try {
    async.parallel(
      {
        email: function (callback) {
          UserModel.findOne({ email }).exec(callback);
        },
        username: function (callback) {
          UserModel.findOne({ username }).exec(callback);
        },
      },
      (err, results) => {
        if (err) return next(err);

        if (results.username) {
          return res.status(500).json({ username: "Username already in use" });
        }

        if (results.email) {
          return res.status(500).json({ email: "Email already in use" });
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) return next(err);
            if (err) return next(err);

            new UserModel({
              username,
              email,
              password: hash,
            }).save((err, user) => {
              if (err) return next(err);
              res.status(200).json(user);
            });
          });
        }
      }
    );
  } catch (error) {
    return next(error);
  }
};

/* LOGINS LOCAL USER */
const localLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) res.status(500).json("wrong username or password");
    else {
      req.login(user, { session: false }, (err) => {
        if (err) return next(err);
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "10m",
          }
        );

        res.status(200).json({ user, token });
      });
    }
  })(req, res, next);
};

export { newUser, localLogin };
