import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  Text,
  Button,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useAddFriend } from "../../api/User/put_user";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  friendId: string;
  friendName: string;
  userId: string;
  ownName: string;
}

export const AddFriendModal: React.FC<Props> = ({
  isOpen,
  onClose,
  friendId,
  friendName,
  userId,
  ownName,
}) => {
  const { mutateAsync } = useAddFriend();

  const addFriend = async () => {
    await mutateAsync({
      userId: userId,
      friendId: friendId,
      friendName: friendName,
      ownName: ownName,
    });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textAlign="center" py="2">
            Do you want to add <b>{friendName}</b> to your friend´s list?
          </Text>
          <Divider borderColor="blackAlpha.400" />
          <Flex pt="2" justifyContent="space-evenly">
            <Button onClick={addFriend}>Add</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
