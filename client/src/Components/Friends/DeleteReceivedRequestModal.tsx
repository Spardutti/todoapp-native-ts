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
import { useDelFriendRequest } from "../../api/User/put_user";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  friendId: string;
  friendName: string;
  userId: string;
}

export const DelReceivedRequestModal: React.FC<Props> = ({
  isOpen,
  onClose,
  friendId,
  friendName,
  userId,
}) => {
  const { mutateAsync } = useDelFriendRequest();

  const delReceivedRequest = async () => {
    await mutateAsync({ userId: userId, friendId: friendId });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textAlign={"center"} mb={3}>
            Do you want to delete the friend request from <b>{friendName}</b>?
          </Text>
          <Flex width={"100%"} justifyContent={"space-around"}>
            <Button onClick={delReceivedRequest}>Yes</Button>
            <Button onClick={onClose}>No</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
