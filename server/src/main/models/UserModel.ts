import { Schema, model } from "mongoose";

declare global {
  namespace Express {
    interface User {
      _id: string;
    }
  }
}

export type User = {
  username: string;
  password: string;
  email: string;
  friends: [{ id: string; friendName: string }];
  friendRequests: [{ status: string; id: string; friendName: string }];
  //settings: ;
};

const UserSchema = new Schema<User>({
  username: String,
  password: String,
  email: String,
  friends: [],
  friendRequests: [{}],
});

export const UserModel = model<User>("User", UserSchema);
