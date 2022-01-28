import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { AddTodo } from "./AddTodo";

export const AddTodoModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IoAddOutline
        color="white"
        fontSize={25}
        cursor={"pointer"}
        onClick={onOpen}
      />
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <AddTodo />
        </ModalContent>
      </Modal>
    </>
  );
};
