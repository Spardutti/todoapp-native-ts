import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { Box, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { FriendRequest } from "../../Interface/Interface";
import { TiTimes } from "react-icons/ti";
import { DelSentRequest } from "./DeleteSentRequest";

export const SentFriendRequests: React.FC = () => {
  const loggedUser = useAppSelector((state) => state.user);
  const [sentRequestsArray, setSentRequestsArray] = useState<FriendRequest[]>(
    []
  );
  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    setSentRequestsArray([]);
    loggedUser.friendRequests?.map((elem: FriendRequest) => {
      if (elem.status === "sent") {
        setSentRequestsArray((prev) => [...prev, elem]);
      } else return null;
    });
  }, [loggedUser]);

  return (
    <Box pb={10}>
      <Heading fontSize={16} textAlign="center" pb={10} cursor={"default"}>
        Sent Requests
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
            borderRadius={"0.375rem"}
            justifyContent={"space-between"}
            key={index}
            py={0.5}
            height={25}
            _hover={{ backgroundColor: "#ECECEC" }}
          >
            <Text pl={3} color={"blackAlpha.600"} cursor={"default"}>
              {elem.friendName}
            </Text>
            <Box pt={1}>
              <TiTimes color="red" cursor={"pointer"} onClick={onOpen} />
              <DelSentRequest
                isOpen={isOpen}
                onClose={onClose}
                friendId={elem.id}
                friendName={elem.friendName}
                userId={loggedUser._id!}
              />
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
