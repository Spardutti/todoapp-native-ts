import React, { useEffect, useState } from "react";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { MdCategory } from "react-icons/md";
import "../../Styles/calendar/calendarButton.scss";
import { ChooseCategoryModal } from "./ChooseCategoryModal";

interface Category {
  setPickedCategory: React.Dispatch<React.SetStateAction<string>>;
  preSelectedCategory: { categoryName: string; color: string } | null;
}

export const OpenChooseCategoryButton: React.FC<Category> = ({
  setPickedCategory,
  preSelectedCategory,
}) => {
  const [categoryColor, setCategoryColor] = useState("Purple");
  const [buttonText, setButtonText] = useState("Category");

  /* IF PRESELECTEDCATEGORY EXISTS UPDATE COLOR AND NAME INFO */
  useEffect(() => {
    if (preSelectedCategory) {
      const preCategoryName = preSelectedCategory.categoryName;
      setButtonText(preCategoryName);
      const preColorName = preSelectedCategory.color;
      setCategoryColor(preColorName);
    }
  }, []);

  const {
    isOpen: isChooseCategoryOpen,
    onOpen: onChooseCategoryOpen,
    onClose: onChooseCategoryClose,
  } = useDisclosure();

  return (
    <>
      <Button
        display="flex"
        justifyContent="space-between"
        maxW="200px"
        height="26px"
        px="8px"
        border="1px"
        borderColor="blackAlpha.400"
        onClick={onChooseCategoryOpen}
        ml="10px"
        bg="white"
      >
        <MdCategory color={categoryColor} />
        <Text textColor={categoryColor} ml="4px" fontSize="13px">
          {buttonText}
        </Text>
      </Button>
      <ChooseCategoryModal
        setCategoryColor={setCategoryColor}
        setButtonText={setButtonText}
        setPickedCategory={setPickedCategory}
        isOpen={isChooseCategoryOpen}
        onClose={onChooseCategoryClose}
      />
    </>
  );
};
