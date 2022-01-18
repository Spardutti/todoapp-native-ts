import { Schema, model } from "mongoose";

export type User = {
  username: string;
  password: string;
  email: string;
  //settings: ;
};

const UserSchema = new Schema<User>({
  username: String,
  password: String,
  email: String,
});

export const UserModel = model<User>("User", UserSchema);
