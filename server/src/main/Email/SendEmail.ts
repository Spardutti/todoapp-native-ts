import cron from "node-cron";
import nodemailer from "nodemailer";
import { UserModel } from "../models/UserModel";
import { TodoModel } from "../models/TodoModel";
import { DateTime } from "luxon";
import hbs from "nodemailer-express-handlebars";

/* FIND USER WITH PENDING TASKS AND SEND EMAIL */
export const mailToUser = async () => {
  const users = await UserModel.find({}).populate("email");

  const today = DateTime.now().setLocale("en-US").toLocaleString();
  users.map(async (user) => {
    const userPendingTasks = await TodoModel.find({
      author: user._id,
      dueDate: { $lt: today },
      isCompleted: false,
    });
    if (userPendingTasks.length > 0) {
      send(user.email, user.username, userPendingTasks.length);
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

export const send = (toUser: string, username: string, text: number) => {
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

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".hbs",
        defaultLayout: false,
      },
      viewPath: "./src/main/email/views/",
      extName: ".hbs",
    })
  );

  const mailOptions = {
    from: { name: "Tasker", address: "process.env.development@gmail.com" },
    to: "luisdamian.sp@gmail.com", //toUser,
    subject: "Today tasks",
    //text: text,
    template: "demo",
    context: {
      name: username,
      tasks: text,
    },
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) console.log("Error" + err);
    else console.log("Email sent");
  });
};

//shegosoftsushima
