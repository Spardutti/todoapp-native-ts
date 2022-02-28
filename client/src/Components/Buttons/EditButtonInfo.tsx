import {
  Box,
  Button,
  CloseButton,
  Divider,
  FormControl,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Todo } from "../../Interface/Interface";
import { OpenCalendarPopOverButton } from "../Calendar/OpenCalendarPopOver";
import { ChooseCategoryButton } from "../Category/ChooseCategoryButton";
import { useEditTodo } from "../../api/Todo/put_todo";
import { useQueryClient } from "react-query";

interface EditTodoProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
}

const EditTodo: React.FC<EditTodoProps> = ({ isOpen, onClose, todo }) => {
  const [editedTodo, setEditedTodo] = useState({
    _id: todo._id,
    todoName: todo.todoName,
    todoDescription: todo.todoDescription,
    dueDate: new Date(todo.dueDate),
    categoryId: todo.category._id,
  });
  const [pickedDate, setPickedDate] = useState(new Date(editedTodo.dueDate));
  const [pickedCategory, setPickedCategory] = useState(editedTodo.categoryId);

  const editTodoHandler = (e: any) => {
    const value = e.target.value;
    setEditedTodo({
      ...editedTodo,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    setEditedTodo({
      ...editedTodo,
      dueDate: pickedDate,
    });
  }, [pickedDate]);

  useEffect(() => {
    setEditedTodo({
      ...editedTodo,
      categoryId: pickedCategory,
    });
  }, [pickedCategory]);

  const queryClient = useQueryClient();

  /* SEND EDITED TODO INFO TO THE DB */
  const { mutateAsync, isLoading } = useEditTodo();

  const editTodo = async () => {
    const response = await mutateAsync(editedTodo);
    /* UPDATE THE TODOS QUERY IN THE DOM */
    queryClient.invalidateQueries("today");
    queryClient.invalidateQueries("upcoming");
    queryClient.invalidateQueries("overdue");
    queryClient.invalidateQueries("completed");
    queryClient.invalidateQueries("latest");

    toast.success("Todo edited succesfully");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      blockScrollOnMount={true}
      autoFocus={false}
    >
      <ModalOverlay bg="none" />
      <ModalContent boxShadow="dark-lg" w={[200, 550]}>
        <Box p={5}>
          <FormControl h="141px">
            <Stack h="141px" alignItems="center">
              <Box display="flex" flexDir="row" width="100%" maxH="21px">
                <Input
                  variant="unstyled"
                  maxH="21px"
                  value={editedTodo.todoName}
                  name="todoName"
                  onChange={(e) => editTodoHandler(e)}
                />
                <CloseButton onClick={onClose} maxH="21px" />
              </Box>
              <Box w="100%" maxH="78px" mt="8px">
                <Textarea
                  resize="none"
                  variant="unstyled"
                  p="1px"
                  m="0px"
                  value={editedTodo.todoDescription}
                  name="todoDescription"
                  onChange={(e) => editTodoHandler(e)}
                />
              </Box>
              <Box w="100%" maxH="38px" display="flex" flexDir="row">
                <OpenCalendarPopOverButton
                  pickedDate={pickedDate}
                  setPickedDate={setPickedDate}
                />
                <ChooseCategoryButton
                  pickedCategory={pickedCategory}
                  setPickedCategory={setPickedCategory}
                  preSelectedCategory={{
                    categoryName: todo.category.categoryName,
                    color: todo.category.color,
                  }}
                />
              </Box>
              <Divider borderColor="blackAlpha.300" />
            </Stack>
          </FormControl>
          <Box h="64px" p="24px 16px 8px 0px">
            {isLoading ? (
              <Button
                colorScheme="messenger"
                isLoading
                loadingText="Submitting"
                size={"sm"}
                fonSize="xs"
              />
            ) : (
              <Button
                onClick={editTodo}
                colorScheme="messenger"
                size="sm"
                fontSize="xs"
              >
                Save
              </Button>
            )}
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default EditTodo;
