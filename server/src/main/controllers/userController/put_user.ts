import { User, UserModel } from "../../models/UserModel";
import { Request, Response, NextFunction } from "express";

/* ADD FRIEND REQUEST TO USER'S REQUEST ARRAY */

const addFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { friendId } = req.body;
  const user = await UserModel.findById(id);
  let userCheck;
  if (user) {
    for (let i = 0; i < user.friendRequests.length; i++) {
      if (user.friendRequests[i] === friendId) userCheck = true;
    }
  }

  try {
    if (userCheck) {
      res.status(500).json("Friend request already sent");
    } else {
      /* ADD THE USER ID TO THE "FRIENDREQUEST" OF THE USER TO ADD */
      const sendFriendRequest = await UserModel.findByIdAndUpdate(friendId, {
        $push: { friendRequests: id },
      });
      /* ADD THE USER ID TO ADD TO THE USER "FRIENDREQUEST" THATS SENDING THE PETITION */
      const sendOwnFriendRequest = await UserModel.findByIdAndUpdate(id, {
        $push: { friendRequests: friendId },
      });
      res.status(200).json([sendFriendRequest, sendOwnFriendRequest]);
    }
  } catch (error) {
    return next(error);
  }
};

/* DELETE A FRIEND REQUEST FROM FRIENDREQUEST ARRAY */
const delFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { friendId } = req.body;

    /* ADD THE USER ID TO THE "FRIENDREQUEST" OF THE USER TO ADD */
    const delFriendRequest = await UserModel.findByIdAndUpdate(friendId, {
      $pull: { friendRequests: id },
    });
    /* ADD THE USER ID TO ADD TO THE USER "FRIENDREQUEST" THATS SENDING THE PETITION */
    const delOwnFriendRequest = await UserModel.findByIdAndUpdate(id, {
      $pull: { friendRequests: friendId },
    });
    res.status(200).json([delFriendRequest, delOwnFriendRequest]);
  } catch (error) {
    return next(error);
  }
};

/* ADD FRIEND TO THE FRIENDS ARRAY */
const addFriend = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { friendId } = req.body;

    /* ADD FRIEND TO THE ACCEPTED USER FRIEND REQUEST ARRAY */
    const addFriend = await UserModel.findByIdAndUpdate(friendId, {
      $push: { friends: id },
    });
    /* ADD FRIEND TO THE USER'S FRIENDS ARRAY THAT ACCEPTED THE PETITION */
    const addOwnFriend = await UserModel.findByIdAndUpdate(id, {
      $push: { friends: friendId },
    });
    res.status(200).json([addFriend, addOwnFriend]);
  } catch (error) {
    return next(error);
  }
};

/* DELETE FRIEND FROM FRIENDS ARRAY */
const delFriend = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { friendId } = req.body;

    /* DELETE FRIEND FROM THE DELETED USER */
    const delFriend = await UserModel.findByIdAndUpdate(friendId, {
      $pull: { friends: id },
    });
    /* DELETE FRIEND FROM THE USER'S FRIEND ARRAY THAT MADE THE DELETE ACTION */
    const delOwnFriend = await UserModel.findByIdAndUpdate(id, {
      $pull: { friends: friendId },
    });
    res.status(200).json([delFriend, delOwnFriend]);
  } catch (error) {
    return next(error);
  }
};

export { addFriendRequest, delFriendRequest, addFriend, delFriend };
