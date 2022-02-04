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
import { useQueryClient } from "react-query";
import { Todo } from "../../api/Todo/post_todo";
import { CalendarButton } from "../Calendar/calendarButton";
import "../../Styles/calendar/calendarButton.scss";
import { useAppSelector } from "../../hooks";
import { useAddTodo } from "../../api/Todo/post_todo";
import React from "react";
import DatePicker from "react-datepicker";
import { OpenCalendarPopOverButton } from "../Calendar/OpenCalendarPopOver";

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
  const { mutateAsync, isLoading } = useAddTodo();
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
      flexDir="column"
      padding="16px"
    >
      <FormControl mx={"auto"}>
        <Stack maxH="121px" alignItems={"center"} marginBottom="10px">
          <Input
            placeholder="Todo name"
            variant="unstyled"
            value={todoName}
            name="todoName"
            onChange={(e) => newTodoHandler(e)}
            maxH="21px"
          />
          <Textarea
            resize="none"
            placeholder="Description"
            variant="unstyled"
            value={todoDescription}
            name="todoDescription"
            onChange={(e) => newTodoHandler(e)}
            maxH="36px"
            padding="1px"
            marginTop="8px"
          />
          <Box width="100%">
            <OpenCalendarPopOverButton />
          </Box>
          {/*  <CalendarButton
            dueDate={dueDate}
            newTodo={newTodo}
            setNewTodo={setNewTodo}
          /> */}
          <Divider orientation="horizontal" borderColor="blackAlpha.300" />
        </Stack>
      </FormControl>
      <Box
        maxH="32px"
        padding="16px"
        //borderTop="1px"
        marginX="-4"
        marginTop="1.5"
        marginBottom="-4"
      >
        {isLoading ? (
          <Button
            mt={2}
            colorScheme="teal"
            isLoading
            loadingText="Submitting"
            maxH="44px"
          />
        ) : (
          <Button
            mt={2}
            colorScheme="messenger"
            onClick={addTodo}
            disabled={!todoName || !todoDescription || !dueDate}
            maxH="30px"
            maxW="78px"
            fontSize="xs"
          >
            Create Todo
          </Button>
        )}
      </Box>
    </Box>
  );
};
