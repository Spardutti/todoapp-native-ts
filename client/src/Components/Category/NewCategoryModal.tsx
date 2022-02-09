import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";

interface NewCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewCategoryModal: React.FC<NewCategoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showColors, setShowColors] = useState(false);
  const [color, setColor] = useState("");

  const Colors = () => (
    <Flex
      direction="column"
      onClick={() => setShowColors(!showColors)}
      border="1px"
      borderColor={"gray.200"}
      borderRadius={5}
      p={2}
      maxH={150}
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <p onClick={() => setColor("red")}>red</p>
      <p>blue</p>
      <p>red</p>
      <p>blue</p>
      <p>blue</p>
      <p>blue</p>
      <p>blue</p>
      <p>blue</p>
      <p>blue</p>
      <p>blue</p>
      <p>blue</p>
    </Flex>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="#FAFAFA"> New category</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>Name</FormLabel>
          <Input />
          <FormLabel>Color</FormLabel>
          {showColors ? (
            <Colors />
          ) : (
            <Flex
              align={"center"}
              border="1px"
              borderColor={"gray.200"}
              borderRadius={5}
              minH={10}
              pl={2}
              onClick={() => setShowColors(!showColors)}
            >
              {color ? color : "Color"}
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewCategoryModal;
