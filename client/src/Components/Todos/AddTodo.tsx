import {
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import { TodoApi } from "../../api/Todo/TodoApi";
import { useQueryClient } from "react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Styles/datePicker.scss";
import { Todo } from "../../api/Todo/post_todo";
import { useAppSelector } from "../../hooks";

export const AddTodo: React.FC = () => {
  const token = useAppSelector((state) => state.token);
  const [newTodo, setNewTodo] = useState<Todo>({
    todoName: "",
    todoDescription: "",
    dueDate: null,
    token: token,
  });

  const resetState = () => {
    setNewTodo({
      todoName: "",
      todoDescription: "",
      dueDate: null,
    });
  };

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
  /* RUN MUTATION ON CLICK */
  const addTodo = async () => {
    await mutateAsync(newTodo);
    resetState();
  };

  const { todoName, todoDescription, dueDate } = newTodo;
  return (
    <Box
      width="full"
      mx="auto"
      //border="1px"
      mt={1}
      //borderColor={"teal"}
      //borderRadius={5}
      p={2}
      //textAlign={"center"}
      //alignItems={"center"}
      //justifyContent={"center"}
    >
      <FormControl mx={"auto"}>
        <Stack alignItems={"center"}>
          <Input
            placeholder="Todo name"
            variant="unstyled"
            value={todoName}
            name="todoName"
            onChange={(e) => newTodoHandler(e)}
          />
          <Textarea
            resize="none"
            placeholder="Description"
            variant="unstyled"
            value={todoDescription}
            name="todoDescription"
            onChange={(e) => newTodoHandler(e)}
          />
          <Box maxW="max-content" textAlign={"center"} p={1} borderRadius={5}>
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
          <Divider orientation="horizontal" borderColor="blackAlpha.300" />
        </Stack>
      </FormControl>
      <Box>
        {isLoading ? (
          <Button
            mt={2}
            colorScheme="teal"
            isLoading
            loadingText="Submitting"
          />
        ) : (
          <Button
            mt={2}
            colorScheme="messenger"
            onClick={addTodo}
            disabled={!todoName || !todoDescription || !dueDate}
          >
            Create Todo
          </Button>
        )}
      </Box>
    </Box>
  );
};
