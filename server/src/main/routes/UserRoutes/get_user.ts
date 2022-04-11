import { UserController } from "../../controllers/userController/UserController";
import { mailToUser } from "../../Email/SendEmail";
import { Router } from "express";
const router = Router();

/* GET USER */
router.get("/user/:id", UserController.getUser);

router.get("/mail", mailToUser);

router.get("/userFriends/:id", UserController.getUserFriends);

router.get("/allUsers", UserController.getAllUsers);

export { router };
