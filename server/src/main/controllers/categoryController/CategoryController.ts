import { newCategory } from "./post_category";
import { getAllCategories, getCategory, getCategoriesByUser } from "./get_category";
import { deleteCategory } from "./delete_category";
import { putCategory } from "./put_category";

export const CategoryController = {
  newCategory,
  getAllCategories,
  getCategory,
  getCategoriesByUser,
  deleteCategory,
  putCategory,
};
