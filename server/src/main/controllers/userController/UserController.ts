import { newUser, localLogin } from "./post_user";
import {
  addFriendRequest,
  delFriendRequest,
  addFriend,
  delFriend,
} from "./put_user";

export const UserController = {
  newUser,
  localLogin,
  addFriendRequest,
  delFriendRequest,
  addFriend,
  delFriend,
};
