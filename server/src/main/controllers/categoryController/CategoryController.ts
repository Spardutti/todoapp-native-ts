import { newCategory } from "./post_category";
import { getAllUserCategories, getCategory, getCategoriesByUser } from "./get_category";
import { deleteCategory } from "./delete_category";
import { putCategory } from "./put_category";

export const CategoryController = {
  newCategory,
  getAllUserCategories,
  getCategory,
  getCategoriesByUser,
  deleteCategory,
  putCategory,
};
