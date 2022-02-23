import {
  Box,
  Button,
  Divider,
  Grid,
  HStack,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Todo } from "../../Interface/Interface";
import { OpenCalendarPopOverButton } from "../Calendar/OpenCalendarPopOver";
import { ChooseCategoryButton } from "../Category/ChooseCategoryButton";
import { useGetCategoryById } from "../../api/Category/get_category";

interface EditTodoProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
  preSelectedCategory: string;
}

const EditTodo: React.FC<EditTodoProps> = ({
  isOpen,
  onClose,
  todo,
  preSelectedCategory,
}) => {
  const { todoName, todoDescription, dueDate } = todo;
  const [editedTodo, setEditedTodo] = useState(todo);
  const [pickedDate, setPickedDate] = useState(new Date(dueDate));
  const [pickedCategory, setPickedCategory] = useState(todo.category._id);

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
      dueDate: pickedDate.toString(),
    });
  }, [pickedDate, todoName, todoDescription]);

  const { data: categoryInfo } = useGetCategoryById(pickedCategory);
  useEffect(() => {
    setEditedTodo({
      ...editedTodo,
      category: {
        categoryName: categoryInfo?.data.categoryName,
        _id: categoryInfo?.data._id,
        color: categoryInfo?.data.color,
      },
    });
  }, [pickedCategory]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Grid p={5} templateColumns={"20px 10fr"}>
          <Box p={5}>
            <Input
              fontSize={22}
              fontWeight={"bold"}
              width="200px"
              value={todoName}
              name="todoName"
              onChange={(e) => editTodoHandler(e)}
            />
            <Textarea
              value={todoDescription}
              name="todoDescription"
              onChange={(e) => editTodoHandler(e)}
            />
            <Box>
              <OpenCalendarPopOverButton
                pickedDate={pickedDate}
                setPickedDate={setPickedDate}
              />
              <ChooseCategoryButton
                pickedCategory={pickedCategory}
                setPickedCategory={setPickedCategory}
                preSelectedCategory={preSelectedCategory}
              />
            </Box>
          </Box>
          <Box>
            <Button>Save</Button>
          </Box>
        </Grid>
        <ModalCloseButton />
        <Divider mb={5} w="90%" mx="auto" />
      </ModalContent>
    </Modal>
  );
};

export default EditTodo;
