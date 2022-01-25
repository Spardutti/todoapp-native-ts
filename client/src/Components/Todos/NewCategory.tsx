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

export const NewCategory: React.FC = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const toggleCategoryForm = () => setShowCategoryForm(!showCategoryForm);

  /* HANDLERS */
  const newCategoryHandler = (e: any) => {
    setCategoryName(e.target.value);
  };

  /* ADD A NEW TASK TO THE DB */
  const { mutateAsync, isLoading } = CategoryApi.useNewCategory();

  const addCategory = async () => {
    await mutateAsync(categoryName);
    setCategoryName("");
    toggleCategoryForm();
  };

  if (showCategoryForm) {
    return (
      <div>
        <FormControl>
          <FormLabel>Category Name</FormLabel>
          <Input value={categoryName} onChange={(e) => newCategoryHandler(e)} />
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
