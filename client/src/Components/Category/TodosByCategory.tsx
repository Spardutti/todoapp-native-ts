import { Heading, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetCategoryById } from "../../api/Category/get_category";
import { useGetTodosByCategory } from "../../api/Todo/get_todo";
import { Todo } from "../../Interface/Interface";
import TodoCard from "../Todos/TodoCard";
import DeleteCategory from "./DeleteCategory";

interface TodosByCategoryProps {}

const TodosByCategory: React.FC<TodosByCategoryProps> = () => {
  const { categoryId } = useParams();

  const { data: category } = useGetCategoryById(categoryId);

  const { data, isLoading } = useGetTodosByCategory(categoryId);

  if (isLoading) return <p>Loading</p>;

  if (data) {
    return data?.data.map((todo: Todo, index: number) => {
      return (
        <Stack key={index} px={10}>
          <HStack pb={10}>
            <Heading fontSize={20} color={category?.data.color}>
              {category?.data.categoryName}
            </Heading>
            {categoryId && <DeleteCategory id={categoryId} />}
          </HStack>
          <TodoCard todo={todo} />
        </Stack>
      );
    });
  }
};

export default TodosByCategory;
