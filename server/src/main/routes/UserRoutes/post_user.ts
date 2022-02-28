import { UserController } from "../../controllers/userController/UserController";
import { Router } from "express";
const router = Router();

/* CREATES LOCAL USER */
router.post("/newUser", UserController.newUser);

/* LOGIN LOCAL USER */
router.post("/localUser", UserController.localLogin);

export { router };
