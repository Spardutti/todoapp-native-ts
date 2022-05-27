import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useDelFriend } from "../../api/User/put_user";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  friendId: string;
  friendName: string;
}

export const DelFriendModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userId,
  friendId,
  friendName,
}) => {
  const { mutateAsync } = useDelFriend();

  const delFriend = async () => {
    await mutateAsync({ userId: userId, friendId: friendId });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textAlign={"center"} mb={3}>
            Do you want to delete <b>{friendName}</b> from your friends?
          </Text>
          <Flex width={"100%"} justifyContent={"space-around"}>
            <Button onClick={delFriend}>Yes</Button>
            <Button onClick={onClose}>No</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
