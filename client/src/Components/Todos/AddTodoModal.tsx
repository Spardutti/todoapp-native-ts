import {
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { AddTodo } from "./AddTodo";

export const AddTodoModal: React.FC<{ color: string; text: string }> = ({
  color,
  text,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack onClick={onOpen} cursor={"pointer"}>
      <IoAddOutline color={color} fontSize={25} />
      <Text display={text ? "block" : "none"}>{text}</Text>
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <AddTodo onClose={onClose} preSelectedDate={null} />
        </ModalContent>
      </Modal>
    </HStack>
  );
};
