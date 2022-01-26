import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { TodoApi } from "../../api/Todo/TodoApi";
import { useQueryClient } from "react-query";
import { tokenContext } from "../../Context/tokenContex";

export const AddTodo: React.FC = () => {
  const [showTodoForm, setShowTodoForm] = useState(false);
  const { token } = useContext(tokenContext);
  const [newTodo, setNewTodo] = useState({
    todoName: "",
    todoDescription: "",
    token,
  });

  const toggleTodoForm = () => setShowTodoForm(!showTodoForm);

  const queryClient = useQueryClient();

  /* HANDLERS */
  const newTodoHandler = (e: any) => {
    const value = e.target.value;
    setNewTodo({
      ...newTodo,
      [e.target.name]: value,
    });
  };

  /* ADD A NEW TODO TO THE DB */
  const { mutateAsync, isLoading } = TodoApi.useAddTodo();

  const addTodo = async () => {
    await mutateAsync(newTodo);
    /* UPDATE THE TODOS QUERY IN THE DOM */
    queryClient.invalidateQueries("todos");
    setNewTodo({
      todoName: "",
      todoDescription: "",
      token,
    });
    toggleTodoForm();
  };

  if (showTodoForm) {
    return (
      <div>
        <FormControl>
          <FormLabel>Todo Name</FormLabel>
          <Input
            value={newTodo.todoName}
            name="todoName"
            onChange={(e) => newTodoHandler(e)}
          />
          <FormHelperText>
            Please insert a name for the new todo.
          </FormHelperText>
          <FormLabel>Todo Description</FormLabel>
          <Input
            value={newTodo.todoDescription}
            name="todoDescription"
            onChange={(e) => newTodoHandler(e)}
          />
          {isLoading ? (
            <Button
              colorScheme="teal"
              size="sm"
              isLoading
              loadingText="Submitting"
            />
          ) : (
            <Button colorScheme="messenger" size="sm" onClick={addTodo}>
              Create Todo
            </Button>
          )}
        </FormControl>
      </div>
    );
  }

  return (
    <div>
      <Button colorScheme="teal" size="md" onClick={toggleTodoForm}>
        New Todo
      </Button>
    </div>
  );
};
