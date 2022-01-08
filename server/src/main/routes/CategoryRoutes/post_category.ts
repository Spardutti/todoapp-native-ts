import { Router } from "express";
import { CategoryController } from "../../controllers/categoryController/CategoryController";
const router = Router();

/* NEW CAT */
router.post("/newCategory", CategoryController.newCategory);

export { router };
