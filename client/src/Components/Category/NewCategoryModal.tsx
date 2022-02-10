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
  Box,
  Text,
} from "@chakra-ui/react";
import NewCategory from "./NewCategory";

interface NewCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewCategoryModal: React.FC<NewCategoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showColors, setShowColors] = useState(false);
  const [color, setColor] = useState({
    name: "",
    color: "",
  });
  const [category, setCategory] = useState({
    color: "",
    categoryName: "",
  });

  const [colorsArray] = useState([
    {
      name: "Navy",
      color: "#001f3f",
    },
    {
      name: "Blue",
      color: "#0074d9",
    },
    {
      name: "Aqua",
      color: "#7fdbff",
    },
    {
      name: "Teal",
      color: "#39CCCC",
    },
    {
      name: "Purple",
      color: "#B10dc9",
    },
    {
      name: "Fuchsia",
      color: "#F012BE",
    },
    {
      name: "Maroon",
      color: "#85144b",
    },
    {
      name: "Red",
      color: "#FF4136",
    },
    {
      name: "Orange",
      color: "#FF851b",
    },
    {
      name: "Yellow",
      color: "#FFDC00",
    },
    {
      name: "Olive",
      color: "#3D9970",
    },
    {
      name: "Green",
      color: "#2ecc40",
    },
    {
      name: "Lime",
      color: "#01ff70",
    },
    {
      name: "Black",
      color: "#111111",
    },
  ]);

  const handler = (e: any) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

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
      {colorsArray.map((color, index) => {
        return (
          <Flex
            align={"center"}
            p={1}
            key={index}
            onClick={() => {
              setColor(color);
              setCategory({
                ...category,
                color: color.color,
              });
            }}
          >
            <Box bg={color.color} h={3} w={3} borderRadius={"full"} />
            <Text pl={3} cursor="pointer">
              {color.name}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setColor({ color: "", name: "" });
        onClose();
      }}
      autoFocus={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="#FAFAFA"> New category</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>Name</FormLabel>
          <Input
            value={category.categoryName}
            name="categoryName"
            onChange={handler}
          />
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
              {color.name ? (
                <Text color={color.color}>{color.name}</Text>
              ) : (
                <Text>Choose a color</Text>
              )}
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => {
              setColor({ color: "", name: "" });
              onClose();
            }}
          >
            Close
          </Button>
          <NewCategory category={category} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewCategoryModal;
