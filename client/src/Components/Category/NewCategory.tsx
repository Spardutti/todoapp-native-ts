import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
//import { QueryClient, useQueryClient } from "react-query";
import { CategoryApi } from "../../api/Category/CategoryApi";
import { useAppSelector } from "../../hooks";

export const NewCategory: React.FC = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const token = useAppSelector((state) => state.token);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    token,
  });

  const toggleCategoryForm = () => setShowCategoryForm(!showCategoryForm);

  /* HANDLERS */
  const newCategoryHandler = (e: any) => {
    const value = e.target.value;
    setNewCategory({
      ...newCategory,
      [e.target.name]: value,
    });
  };

  /* ADD A NEW TODO TO THE DB */
  const { mutateAsync, isLoading } = CategoryApi.useNewCategory();

  const addCategory = async () => {
    await mutateAsync(newCategory);
    setNewCategory({
      categoryName: "",
      token,
    });
    toggleCategoryForm();
  };

  if (showCategoryForm) {
    return (
      <div>
        <FormControl>
          <FormLabel>Category Name</FormLabel>
          <Input
            value={newCategory.categoryName}
            name="categoryName"
            onChange={(e) => newCategoryHandler(e)}
          />
          <FormHelperText>
            Please insert a name for the new category.
          </FormHelperText>
        </FormControl>
        {isLoading ? (
          <Button
            colorScheme="teal"
            size="sm"
            isLoading
            loadingText="Submitting"
          />
        ) : (
          <Button colorScheme="messenger" size="sm" onClick={addCategory}>
            Create Category
          </Button>
        )}
      </div>
    );
  }
  return (
    <div>
      <Button colorScheme="teal" size="md" onClick={toggleCategoryForm}>
        New Category
      </Button>
    </div>
  );
};
