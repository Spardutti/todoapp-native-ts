import { any } from "async";
import { Schema, model, ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface User {
      _id: string
    }
  }
}

export type User = {
  username: string;
  password: string;
  email: string;
  friends: [];
  //settings: ;
};

const UserSchema = new Schema<User>({
  username: String,
  password: String,
  email: String,
  friends: [],
});

export const UserModel = model<User>("User", UserSchema);
