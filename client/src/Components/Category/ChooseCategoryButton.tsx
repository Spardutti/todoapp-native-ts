import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Flex,
  Text,
  Spacer,
  propNames,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetUserCategories } from "../../api/Category/get_category";
import { useAppSelector } from "../../hooks";
import { MdCategory } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";
import "../../Styles/calendar/calendarButton.scss";
import NewCategoryModal from "./NewCategoryModal";
import { useGetCategoryById } from "../../api/Category/get_category";

interface Props {
  pickedCategory: string;
  setPickedCategory: React.Dispatch<React.SetStateAction<string>>;
  preSelectedCategory: { categoryName: string, color: string} | null;
}

export const ChooseCategoryButton: React.FC<Props> = ({
  pickedCategory,
  setPickedCategory,
  preSelectedCategory,
}) => {
  const token = useAppSelector((state) => state.token.token);
  const { data } = useGetUserCategories(token);
  const [categoryColor, setCategoryColor] = useState("black");
  const [buttonText, setButtonText] = useState("Category");
  const [isOpen, setIsOpen] = useState(false);



  /* IF PRESELECTEDCATEGORY EXISTS UPDATE COLOR AND NAME INFO */
  useEffect(() => {

    if (preSelectedCategory) {
      const preCategoryName = preSelectedCategory.categoryName
      setButtonText(preCategoryName)
      const preColorName = preSelectedCategory.color
      setCategoryColor(preColorName)
    }
  }, [])

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure();

  useEffect(() => {
    close();
  }, [pickedCategory]);

  interface Category {
    _id: string;
    author: string;
    categoryName: string;
    color: string;
  }

  const category = (catObj: Category) => {
    const { _id, color, categoryName } = catObj;
    setPickedCategory(_id);
    setCategoryColor(color);
    setButtonText(categoryName);
  };

  const CategoryList = () => {
    return (
      <Flex direction="column">
        {data?.data.map((cat: Category) => (
          <Button
            key={cat._id}
            bgColor="white"
            width="100%"
            textAlign="left"
            onClick={() => category(cat)}
            my="2px"
            textColor={cat.color}
          >
            {cat.categoryName}
          </Button>
        ))}
      </Flex>
    );
  };

  return (
    <>
      <Popover placement="right" isOpen={isOpen} onClose={close}>
        <PopoverTrigger>
          <Button
            display="flex"
            justifyContent="space-between"
            maxW="200px"
            height="26px"
            px="8px"
            border="1px"
            borderColor="blackAlpha.400"
            onClick={open}
            ml="10px"
          >
            <MdCategory color={categoryColor} />
            <Text textColor={categoryColor} ml="4px" fontSize="13px">
              {buttonText}
            </Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent maxW="180px">
          <PopoverHeader>
            <Box
              cursor={"pointer"}
              display="flex"
              borderRadius={5}
              justifyContent="center"
            >
              <Button
                colorScheme="messenger"
                textColor="white"
                onClick={onModalOpen}
              >
                New Category
              </Button>
            </Box>
          </PopoverHeader>
          <PopoverBody padding="0px">{data && <CategoryList />}</PopoverBody>
          <NewCategoryModal isOpen={isModalOpen} onClose={onModalClose} />
        </PopoverContent>
      </Popover>
    </>
  );
};
