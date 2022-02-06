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
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxWidth="518px" height="209px">
          <AddTodo preSelectedDate={new Date("2022-02-06T16:35:02.081Z")} />
        </ModalContent>
      </Modal>
    </>
  );
};
