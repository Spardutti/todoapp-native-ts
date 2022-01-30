import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Styles/datePicker.scss";
import { Todo } from "../../api/Todo/post_todo";
import { useAppSelector } from "../../hooks";
import { useAddTodo } from "../../api/Todo/post_todo";

export const AddTodo: React.FC = () => {
  const [showTodoForm, setShowTodoForm] = useState(false);
  const token = useAppSelector((state) => state.token);
  const [newTodo, setNewTodo] = useState<Todo>({
    todoName: "",
    todoDescription: "",
    dueDate: null,
    token: token,
  });

  const toggleTodoForm = () => {
    if (showTodoForm) resetState();
    setShowTodoForm(!showTodoForm);
  };

  const resetState = () => {
    setNewTodo({
      todoName: "",
      todoDescription: "",
      dueDate: null,
    });
  };

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
  const { mutateAsync, isLoading } = useAddTodo();
  /* RUN MUTATION ON CLICK */
  const addTodo = async () => {
    await mutateAsync(newTodo);
    /* UPDATE THE TODOS QUERY IN THE DOM */
    queryClient.invalidateQueries("todos");
    resetState();
    toggleTodoForm();
  };

  if (showTodoForm) {
    const { todoName, todoDescription, dueDate } = newTodo;
    return (
      <Box
        w={400}
        mx="auto"
        border="1px"
        mt={1}
        borderColor={"teal"}
        borderRadius={5}
        p={2}
        textAlign={"center"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CloseButton ml="auto" onClick={toggleTodoForm} />
        <FormControl mx={"auto"}>
          <Stack alignItems={"center"}>
            <FormLabel>Todo Name</FormLabel>
            <Input
              value={todoName}
              name="todoName"
              onChange={(e) => newTodoHandler(e)}
            />
            <FormLabel>Todo Description</FormLabel>
            <Input
              value={todoDescription}
              name="todoDescription"
              onChange={(e) => newTodoHandler(e)}
            />
            <FormLabel>Select Date</FormLabel>
            <Box textAlign={"center"} p={1} borderRadius={5}>
              <DatePicker
                minDate={new Date()}
                selected={dueDate}
                onChange={(date) =>
                  date &&
                  setNewTodo({
                    ...newTodo,
                    dueDate: date,
                  })
                }
                placeholderText="Please select a date"
                className="picker"
              />
            </Box>

            {isLoading ? (
              <Button
                mt={2}
                w={40}
                colorScheme="teal"
                isLoading
                loadingText="Submitting"
              />
            ) : (
              <Button
                mt={2}
                colorScheme="messenger"
                w={40}
                onClick={addTodo}
                disabled={!todoName || !todoDescription || !dueDate}
              >
                Create Todo
              </Button>
            )}
          </Stack>
        </FormControl>
      </Box>
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
