import { Router } from "express";
import { CategoryController } from "../../controllers/categoryController/CategoryController";

const router = Router();

/* GET ALL */
router.get("/categories", CategoryController.getAllCategories);

/* GET BY ID */
router.get("/category/:id", CategoryController.getCategory);

export { router };
