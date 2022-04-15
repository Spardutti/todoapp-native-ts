import React, { useState, useEffect, SetStateAction, ElementType } from "react";
import { Text, Flex, useDisclosure, Box } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks";
import { User } from "../../Interface/Interface";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUserClock, FaUserFriends } from "react-icons/fa";
import { FriendRequestModal } from "./AddFriendRequestModal";

interface Props {
  elem: User;
}

export const UserFoundCard: React.FC<Props> = ({ elem }) => {
  const loggedUser = useAppSelector((state) => state.user);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const UserFriendStatus = () => {
    if (loggedUser.friends?.find((element) => element === elem._id)) {
      return <FaUserFriends color="green" cursor="pointer" />;
    } else if (
      loggedUser.friendRequests?.find((element) => element === elem._id)
    ) {
      return <FaUserClock color="#0074E2" cursor="pointer" />;
    } else {
      return (
        <Box>
          <AiOutlineUserAdd cursor="pointer" onClick={onOpen} />
          <FriendRequestModal
            isOpen={isOpen}
            onClose={onClose}
            friendId={elem._id}
          />
        </Box>
      );
    }
  };

  return (
    <Flex width="300px" _hover={{ background: "#E2E8F0" }}>
      <Text
        pl={0.5}
        px={2}
        width="70%"
        maxH="25px"
        overflow="hidden"
        cursor="default"
      >
        {elem.username}
      </Text>
      <Flex width="30%" px={2} justifyContent="end">
        <UserFriendStatus />
      </Flex>
    </Flex>
  );
};
