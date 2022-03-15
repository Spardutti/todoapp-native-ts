import { getUser } from "../../controllers/userController/get_user";
import { mailToUser } from "../../controllers/Schedule/SendEmail";
import { Router } from "express";
const router = Router();

/* GET USER */
router.get("/user/:id", getUser);

router.get("/mail", mailToUser);

export { router };
