import React, { useState, useEffect, SetStateAction, ElementType } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks";
import { User } from "../../Interface/Interface";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUserClock, FaUserFriends } from "react-icons/fa";
import { blacken, whiten } from "@chakra-ui/theme-tools";

interface Props {
  elem: User;
}

export const UserFoundCard: React.FC<Props> = ({ elem }) => {
  const loggedUser = useAppSelector((state) => state.user);

  const UserFriendStatus = () => {
    if (loggedUser.friends?.find((element) => element === elem._id)) {
      return <FaUserFriends color="green" />;
    } else if (
      loggedUser.friendRequests?.find((element) => element === elem._id)
    ) {
      return <FaUserClock color="#0074E2" />;
    } else {
      return <AiOutlineUserAdd />;
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
