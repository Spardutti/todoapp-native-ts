import React from "react";
import { useAppSelector } from "../../hooks";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DelFriendModal } from "./DeleteFriendModal";
import { TiTimes } from "react-icons/ti";

export const AddedFriends: React.FC = () => {
  const loggedUser = useAppSelector((state) => state.user);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box>
      <Heading fontSize={16} textAlign="center" pb={10} cursor={"default"}>
        Friends
      </Heading>
      <Box
        maxH={200}
        overflow="hidden"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {loggedUser.friends?.map((elem, index) => (
          <Flex
            justifyContent="space-between"
            key={index}
            py={0.5}
            width={"100%"}
            height={25}
            _hover={{ backgroundColor: "#ECECEC" }}
            borderRadius={"0.375rem"}
          >
            <Text pl={3} color={"blackAlpha.600"} cursor={"default"}>
              {elem.friendName}
            </Text>
            <Box mr={3} pt={0.5}>
              <TiTimes color="red" cursor={"pointer"} onClick={onOpen} />
              <DelFriendModal
                isOpen={isOpen}
                onClose={onClose}
                userId={loggedUser._id!}
                friendId={elem.id}
                friendName={elem.friendName}
              />
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
