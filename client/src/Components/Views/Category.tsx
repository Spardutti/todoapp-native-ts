import { Box } from "@chakra-ui/react";
import React from "react";
import TodosByCategory from "../Category/TodosByCategory";
import Layout from "../Layout/Layout";

const Category: React.FC = () => {
  return (
    <Layout>
      <TodosByCategory />
    </Layout>
  );
};

export default Category;

// 8208099
