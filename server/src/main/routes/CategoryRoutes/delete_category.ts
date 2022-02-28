import { CategoryController } from "../../controllers/categoryController/CategoryController";
import { Router } from "express";
import passport from "passport";
const router = Router();

const jwtProtected = passport.authenticate("jwt", { session: false });

router.delete(
  "/deleteCategory/:id",
  jwtProtected,
  CategoryController.deleteCategory
);

export { router };
