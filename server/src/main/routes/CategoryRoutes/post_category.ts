import { Router } from "express";
import passport from "passport";
import { CategoryController } from "../../controllers/categoryController/CategoryController";
import { validateNewCategory } from "../../validations/CategoryValidation";

const jwtProtected = passport.authenticate("jwt", { session: false });

const router = Router();

/* NEW CAT */
router.post(
  "/newCategory",
  jwtProtected,
  validateNewCategory,
  CategoryController.newCategory
);

export { router };
