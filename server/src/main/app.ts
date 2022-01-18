import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { router as indexRouter } from "./routes/routes";
import { Request, Response, NextFunction, Application } from "express";
import passport from "passport";
const session = require("express-session");

require("dotenv").config();
require("./Passport/passport-local");
const app: Application = express();

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
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
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

const port: any | number = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on${port}`));
export { app };
