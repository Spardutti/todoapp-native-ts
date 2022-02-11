import {
  Box,
  Collapse,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { BiRightArrow } from "react-icons/bi";
import { HiOutlinePlus } from "react-icons/hi";
import { useGetUserCategories } from "../../api/Category/get_category";
import { useAppSelector } from "../../hooks";
import NewCategoryModal from "./NewCategoryModal";

interface ShowCategoriesProps {}

const ShowCategories: React.FC<ShowCategoriesProps> = () => {
  const token = useAppSelector((state) => state.token.token);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const { isOpen, onToggle } = useDisclosure();

  const { data } = useGetUserCategories(token);

  const CategoriesList = () => {
    interface Category {
      _id: string;
      author: string;
      categoryName: string;
      color: string;
    }

    return data?.data.map((cat: Category) => (
      <Flex align={"center"} key={cat._id}>
        <Box w={3} h={3} bg={cat.color} borderRadius={"full"} />
        <Text pl={4} cursor="pointer">
          {cat.categoryName}
        </Text>
      </Flex>
    ));
  };

  return (
    <Box>
      <Flex mt={10} alignItems="center">
        {isOpen ? (
          <motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }}>
            <BiRightArrow />
          </motion.div>
        ) : (
          <motion.div initial={{ rotate: 90 }} animate={{ rotate: 0 }}>
            <BiRightArrow />
          </motion.div>
        )}
        <Text
          pl={3}
          fontWeight={"bold"}
          userSelect="none"
          _hover={{ cursor: "Pointer" }}
          onClick={onToggle}
        >
          Categories
        </Text>
        <Spacer />
        <Box
          _hover={{ background: "#ECECEC" }}
          cursor={"pointer"}
          pl={0.5}
          p={2}
          borderRadius={5}
          onClick={onModalOpen}
        >
          <HiOutlinePlus />
        </Box>
      </Flex>
      <Collapse in={isOpen}>{data && <CategoriesList />}</Collapse>
      <NewCategoryModal isOpen={isModalOpen} onClose={onModalClose} />
    </Box>
  );
};

export default ShowCategories;
