import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { useGetUserCategories } from "../../api/Category/get_category";
import { useAppSelector } from "../../hooks";

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

  const category = (e: any) => {
    const value = e.target.id;
    setPickedCategory(value);
  };

  const CategoryList = () => {
    interface Props {
      _id: string;
      author: string;
      categoryName: string;
    }

    return data?.data.map((cat: Props) => (
      <Flex key={cat._id}>
        <Button
          id={cat._id}
          bgColor="white"
          width="100%"
          textAlign="left"
          onClick={(e) => category(e)}
        >
          {cat.categoryName}
        </Button>
      </Flex>
    ));
  };

  return (
    <>
      <Popover placement="right">
        <PopoverTrigger>
          <Button
            display="flex"
            justifyContent="space-between"
            maxW="100px"
            height="26px"
            px="8px"
            bgColor="white"
            border="1px"
            borderColor="blackAlpha.400"
          ></Button>
        </PopoverTrigger>
        <PopoverContent maxW="180px">
          <PopoverHeader>
            <Text textAlign="center">Select a Category</Text>
          </PopoverHeader>
          <PopoverBody>{data && <CategoryList />}</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
