import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
  Button,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useSendFriendRequest } from "../../api/User/put_user";
import { useAppSelector } from "../../hooks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  friendId: any;
}

export const FriendRequestModal: React.FC<Props> = ({
  isOpen,
  onClose,
  friendId,
}) => {
  const loggedUser = useAppSelector((state) => state.user);
  const userId = loggedUser._id!;
  const { mutateAsync } = useSendFriendRequest();

  const sendRequest = async () => {
    await mutateAsync({ userId, friendId });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textAlign="center" py="2">
            Do you want to send a friend request to ...?
          </Text>
          <Divider borderColor="blackAlpha.400" />
          <Flex pt="2" justifyContent="space-evenly">
            <Button onClick={sendRequest}>Add</Button>
            <Button>Cancel</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
