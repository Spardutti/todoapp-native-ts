import React from "react";
import { useGetTodosByCategory } from "../../api/Todo/get_todo";
import { Todo } from "../../Interface/Interface";
import TodoCard from "../Todos/TodoCard";

interface TodosByCategoryProps {
  categoryId: string | undefined;
}

const TodosByCategory: React.FC<TodosByCategoryProps> = ({ categoryId }) => {
  const { data, isLoading } = useGetTodosByCategory(categoryId);

  if (isLoading) return <p>Loading</p>;

  if (data) {
    const { todoName, todoDescription, dueDate } = data?.data;

    return data?.data.map((todo: Todo, index: number) => {
      return <TodoCard todo={todo} key={index} />;
    });
  }
};

export default TodosByCategory;
