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
import { useAppDispatch, useAppSelector } from "../../hooks";
import NewCategoryModal from "./NewCategoryModal";
import { useNavigate } from "react-router-dom";
import { toggleDrawer } from "../../store/Reducers/Drawer/drawerReducer";
import { AiOutlineDelete } from "react-icons/ai";
import { scale } from "chroma-js";
import DeleteCategory from "./DeleteCategory";

interface ShowCategoriesProps {}

/* DISPLAY THE CATEGORIES OF THE USER ON THE DRAWER MENU */
const ShowCategories: React.FC<ShowCategoriesProps> = () => {
  const token = useAppSelector((state) => state.token.token);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* MODAL CONTROLLERS */
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  /* TOGGLES DE LIST OF GATEGORIES */
  const { isOpen, onToggle } = useDisclosure();

  /* FETCH USER CATEGORIES */
  const { data } = useGetUserCategories(token);

  /* LOOP AND DISPLAY THE CATEGORIES OF THE CURRENT USER */
  const CategoriesList = () => {
    interface Category {
      _id: string;
      author: string;
      categoryName: string;
      color: string;
    }

    return data?.data.map((cat: Category) => (
      <Flex
        align={"center"}
        key={cat._id}
        _hover={{ background: "gray.200" }}
        borderRadius={5}
        p={1}
        cursor="pointer"
        onClick={() => {
          navigate(`/category/${cat._id}`);
          dispatch(toggleDrawer());
        }}
      >
        <Box w={3} h={3} bg={cat.color} borderRadius={"full"} />
        <Text pl={4}>{cat.categoryName}</Text>

        <DeleteCategory id={cat._id} />
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
      {/* TOGGLE CATEGORIES LIST */}
      <Collapse in={isOpen}>{data && <CategoriesList />}</Collapse>
      {/* MODAL USED TO CREATE A NEW CATEGORY */}
      <NewCategoryModal isOpen={isModalOpen} onClose={onModalClose} />
    </Box>
  );
};

export default ShowCategories;
