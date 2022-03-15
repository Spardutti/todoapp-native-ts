import cron from "node-cron";
import nodemailer from "nodemailer";
import { UserModel } from "../../models/UserModel";
import { TodoModel } from "../../models/TodoModel";
import { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";

/* FIND USER WITH PENDING TASKS AND SEND EMAIL */
export const mailToUser = async () =>
  // req: Request,
  // res: Response,
  // next: NextFunction
  {
    const users = await UserModel.find({}).populate("email");

    const today = DateTime.now().setLocale("en-US").toLocaleString();
    users.map(async (user) => {
      const userPendingTasks = await TodoModel.find({
        author: user._id,
        dueDate: { $lt: today },
        isCompleted: false,
      });
      if (userPendingTasks.length > 0) {
        send(user.email, `You have ${userPendingTasks.length} pending tasks!`);
      }
    });
  };

export const job = cron.schedule(
  "0 5 8 * * *",
  function jobYouNeedToExecute() {
    mailToUser();
  },
  {
    timezone: "America/Argentina/Buenos_Aires",
  }
);

export const send = (toUser: string, text: string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: "process.env.development@gmail.com",
    to: toUser,
    subject: "Tasker",
    text: text,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log("Error" + err);
    else console.log("Email sent");
  });
};

//shegosoftsushima
