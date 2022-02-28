import { getUser } from "../../controllers/userController/get_user";
import { Router } from "express";
const router = Router();

/* GET USER */
router.get("/user/:id", getUser);

export { router };
