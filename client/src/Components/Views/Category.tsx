import { Box } from "@chakra-ui/react";
import React from "react";
import TodosByCategory from "../Category/TodosByCategory";
import Layout from "../Layout/Layout";

interface CategoryProps {}

const Category: React.FC<CategoryProps> = () => {
  return (
    <Layout>
      <Box>
        <TodosByCategory />
      </Box>
    </Layout>
  );
};

export default Category;

// 8208099
