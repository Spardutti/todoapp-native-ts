import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { router as indexRouter } from "./main/routes/routes";
import { Request, Response, NextFunction, Application } from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { job, mailToUser } from "./main/Email/SendEmail";

// require("dotenv").config();
require("./main/Passport/passport-local");
require("./main/Passport/jwt");

const app: Application = express();
app.use(cors());

/* MONGODB CONNECTION */
import mongoose, { ConnectOptions } from "mongoose";
const mongoDB = process.env.MONGO_URI;
const db = mongoose.connection;
mongoose.connect(mongoDB!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
db.on("error", console.error.bind(console, "Mongo connection error"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

// import { send } from "./main/controllers/Schedule/SendEmail";
// send();
const port: any | number = process.env.PORT || 5000;
app.listen(port, () => {
  job.start();
  // mailToUser();
  console.log(`server started on ${port}`);
});
export { app };
