import React, { useState } from "react";
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { useGetUserCategories } from "../../api/Category/get_category";

export const ChooseCategoryButton: React.FC = () => {
  const [showCategories, setShowCategories] = useState(false);

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
        <PopoverContent></PopoverContent>
      </Popover>
    </>
  );
};
