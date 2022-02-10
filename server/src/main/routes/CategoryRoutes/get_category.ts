import { Router } from "express";
import passport from "passport";
import { CategoryController } from "../../controllers/categoryController/CategoryController";

const router = Router();

const jwtProtected = passport.authenticate("jwt", { session: false });

/* GET ALL */
router.get(
  "/categories",
  jwtProtected,
  CategoryController.getAllUserCategories
);

/* GET BY ID */
router.get("/category/:id", CategoryController.getCategory);

export { router };
