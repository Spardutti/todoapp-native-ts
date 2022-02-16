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
} from "@chakra-ui/react";
import { useGetUserCategories } from "../../api/Category/get_category";
import { useAppSelector } from "../../hooks";
import { MdCategory } from "react-icons/md";
import "../../Styles/calendar/calendarButton.scss";

interface Props {
  pickedCategory: string;
  setPickedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const ChooseCategoryButton: React.FC<Props> = ({
  pickedCategory,
  setPickedCategory,
}) => {
  const token = useAppSelector((state) => state.token.token);
  const { data } = useGetUserCategories(token);
  const [categoryColor, setCategoryColor] = useState("black");
  const [buttonText, setButtonText] = useState("Category");
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  useEffect(() => {
    close();
  }, [pickedCategory]);

  interface Props {
    _id: string;
    author: string;
    categoryName: string;
    color: string;
  }

  const category = (catObj: Props) => {
    const catId = catObj._id;
    const catColor = catObj.color;
    const catName = catObj.categoryName;
    setPickedCategory(catId);
    setCategoryColor(catColor);
    setButtonText(catName);
  };

  const CategoryList = () => {
    return (
      <Flex direction="column">
        {data?.data.map((cat: Props) => (
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
            <Text textAlign="center">Select a Category</Text>
          </PopoverHeader>
          <PopoverBody padding="0px">{data && <CategoryList />}</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
