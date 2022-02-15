import { Box, Heading } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCategoryById } from "../../api/Category/get_category";
import TodosByCategory from "../Category/TodosByCategory";

interface CategoryProps {}

const Category: React.FC<CategoryProps> = () => {
  const { categoryId } = useParams();

  const { isLoading, data } = useGetCategoryById(categoryId);

  return (
    <Box>
      <Heading fontSize={25} pt={20} px={10}>
        {data?.data.categoryName}
      </Heading>
      <Box p={10}>
        <TodosByCategory categoryId={categoryId} />
      </Box>
    </Box>
  );
};

export default Category;

// 8208099
