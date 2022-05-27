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
import { useSendFriendRequest } from "../../api/User/put_user";
import { useAppSelector } from "../../hooks";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  friendId: string;
  friendName: string;
}

export const FriendRequestModal: React.FC<Props> = ({
  isOpen,
  onClose,
  friendId,
  friendName,
}) => {
  const loggedUser = useAppSelector((state) => state.user);
  const userId = loggedUser._id!;
  const ownName = loggedUser.username!;
  const { mutateAsync } = useSendFriendRequest();

  const sendRequest = async () => {
    await mutateAsync({ userId, friendId, friendName, ownName });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Text textAlign="center" py="2">
            Do you want to send a friend request to <b>{friendName}</b>?
          </Text>
          <Divider borderColor="blackAlpha.400" />
          <Flex pt="2" justifyContent="space-evenly">
            <Button onClick={sendRequest}>Add</Button>
            <Button onClick={onClose}>Cancel</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
