import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FriendRequest } from "../../Interface/Interface";
import { TiTick, TiTimes } from "react-icons/ti";
import { AddFriendModal } from "./AddFriendModal";
import { DelReceivedRequestModal } from "./DeleteReceivedRequestModal";

export const ReceivedFriendRequests: React.FC = () => {
  const loggedUser = useAppSelector((state) => state.user);
  const [sentRequestsArray, setSentRequestsArray] = useState<FriendRequest[]>(
    []
  );
  const {
    isOpen: isOpenAccept,
    onClose: onCloseAccept,
    onOpen: onOpenAccept,
  } = useDisclosure();
  const {
    isOpen: isOpenDeny,
    onClose: onCloseDeny,
    onOpen: onOpenDeny,
  } = useDisclosure();

  useEffect(() => {
    setSentRequestsArray([]);
    loggedUser.friendRequests?.map((elem: FriendRequest) => {
      if (elem.status === "received") {
        setSentRequestsArray((prev) => [...prev, elem]);
      } else return null;
    });
  }, [loggedUser]);

  return (
    <Box pt={10}>
      <Heading fontSize={16} textAlign="center" pb={10} cursor={"default"}>
        Received Requests
      </Heading>
      <Box
        maxH={75}
        overflow="hidden"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {sentRequestsArray.map((elem, index) => (
          <Flex
            justifyContent="space-between"
            key={index}
            py={0.5}
            height={25}
            _hover={{ backgroundColor: "#ECECEC" }}
            borderRadius={"0.375rem"}
          >
            <Text pl={3} color={"blackAlpha.600"} cursor={"default"}>
              {elem.friendName}
            </Text>
            <Flex>
              <Box pt={1}>
                <TiTick
                  color="green"
                  cursor={"pointer"}
                  onClick={onOpenAccept}
                />
                <AddFriendModal
                  isOpen={isOpenAccept}
                  onClose={onCloseAccept}
                  friendId={elem.id}
                  friendName={elem.friendName}
                  userId={loggedUser._id!}
                  ownName={loggedUser.username!}
                />
              </Box>
              <Box pt={1} mr={3}>
                <TiTimes color="red" cursor={"pointer"} onClick={onOpenDeny} />
                <DelReceivedRequestModal
                  isOpen={isOpenDeny}
                  onClose={onCloseDeny}
                  friendId={elem.id}
                  friendName={elem.friendName}
                  userId={loggedUser._id!}
                />
              </Box>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
