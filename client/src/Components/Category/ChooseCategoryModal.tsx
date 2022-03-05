import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetUserCategories } from "../../api/Category/get_category";
import { useAppSelector } from "../../hooks";
import NewCategoryModal from "./NewCategoryModal";

interface Category {
  setPickedCategory: React.Dispatch<React.SetStateAction<string>>;
  setCategoryColor: React.Dispatch<React.SetStateAction<string>>;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  onClose: () => void;
}

export const ChooseCategoryModal: React.FC<Category> = ({
  setPickedCategory,
  setCategoryColor,
  setButtonText,
  isOpen,
  onClose,
}) => {
  const token = useAppSelector((state) => state.token.token);
  const { data } = useGetUserCategories(token);

  /* OPEN/CLOSE FUNCTIONS FOR NEW CATEGORY MODAL */
  const {
    isOpen: isModalOpen,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure();

  /* GET USER CATEGORIES INFO AND STORE IT IN STATES TO USE */
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
    onClose();
  };

  /* MAP BETWEEN THE EXISTENT USER´S CATEGORIES AND RENDER THEM */
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
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
          </ModalHeader>
          <ModalBody padding="0px">{data && <CategoryList />}</ModalBody>
          <NewCategoryModal isOpen={isModalOpen} onClose={onModalClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
