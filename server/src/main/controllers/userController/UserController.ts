import { newUser, localLogin } from "./post_user";
import {
  addFriendRequest,
  delFriendRequest,
  addFriend,
  delFriend,
} from "./put_user";
import { getUser, getUserFriends, getAllUsers } from "./get_user";

export const UserController = {
  newUser,
  localLogin,
  addFriendRequest,
  delFriendRequest,
  addFriend,
  delFriend,
  getUser,
  getUserFriends,
  getAllUsers,
};
