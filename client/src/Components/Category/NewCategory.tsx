import { Button } from "@chakra-ui/react";
import React from "react";
import { useNewCategory } from "../../api/Category/post_category";
import { useAppSelector } from "../../hooks";

interface NewCategoryProps {
  category: {
    categoryName: string;
    color: string;
  };
}

const NewCategory: React.FC<NewCategoryProps> = ({ category }) => {
  const token = useAppSelector((state) => state.token.token);
  const { mutateAsync, data, isLoading, error } = useNewCategory();

  const createCategory = async () => {
    const info = {
      token,
      categoryName: category.categoryName,
      color: category.color,
    };
    await mutateAsync(info);
  };

  if (data) {
    if (data.data) console.log(data.data.errors);
  }

  return <Button onClick={createCategory}>Create</Button>;
};

export default NewCategory;
