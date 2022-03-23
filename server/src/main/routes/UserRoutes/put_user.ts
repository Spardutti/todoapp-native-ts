import { UserController } from "../../controllers/userController/UserController";
import { Router } from "express";

const router = Router();

router.put("/addFriendRequest/:id", UserController.addFriendRequest);
router.put("/delFriendRequest/:id", UserController.delFriendRequest);
router.put("/addFriend/:id", UserController.addFriend);
router.put("/delFriend/:id", UserController.delFriend);

export { router };
