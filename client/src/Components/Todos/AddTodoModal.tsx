import {
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiTodoLine } from "react-icons/ri";
import { AddTodo } from "./AddTodo";

interface Props {
  preSelectedDate: Date | null;
  color: string;
  text: string;
}

export const AddTodoModal: React.FC<Props> = ({
  color,
  text,
  preSelectedDate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack onClick={onOpen} cursor={"pointer"}>
      <RiTodoLine color={color} fontSize={25} />
      <Text display={text ? "block" : "none"}>{text}</Text>
      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        autoFocus={false}
      >
        <ModalOverlay bg="none" />
        <ModalContent boxShadow="dark-lg" w={[200, 550]}>
          <AddTodo onClose={onClose} preSelectedDate={preSelectedDate} />
        </ModalContent>
      </Modal>
    </HStack>
  );
};
