import React, { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useGetAllUsers } from "../../api/User/get_user";
import { useAppSelector } from "../../hooks";
import { User } from "../../Interface/Interface";
import { UserFoundCard } from "./userFoundCard";
interface Info {
  searchInfo: string;
  setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const MatchedUsersModal: React.FC<Info> = ({
  searchInfo,
  setSearchStatus,
}) => {
  const { data: users } = useGetAllUsers();
  const [filteredArray, setFilteredArray] = useState<User[]>([]);
  const loggedUser = useAppSelector((state) => state.user);
  const [userFriendStatus, setUserFriendStatus] = useState("");

  /* UPDATE THE FILTERED ARRAY EVERYTIME THE SEARCH INPUT IS MODIFIED */
  useEffect(() => {
    setFilteredArray([]);

    if (searchInfo) {
      users.data.forEach((element: User) => {
        if (element.username.toLowerCase().match(searchInfo.toLowerCase())) {
          setFilteredArray((prev) => [...prev, element]);
        }
      });
    }
    console.log(loggedUser);
  }, [searchInfo]);

  useEffect(() => {
    if (filteredArray.length > 0) {
      setSearchStatus("none");
    } else {
      setSearchStatus("lg");
    }
    console.log(filteredArray);
  }, [filteredArray]);

  const userStatus = (id: string) => {
    loggedUser.friends?.forEach((element) => {
      if (loggedUser.friends?.find((elem) => elem === id)) {
        console.log("hi1");

        setUserFriendStatus("pipi");
      } else if (loggedUser.friendRequests?.find((elem) => elem === id)) {
        console.log("hi2");

        setUserFriendStatus("popo");
      } else {
        console.log("hi3");

        setUserFriendStatus("pupu");
      }
    });
  };

  return (
    <Box
      maxH="150px"
      position="absolute"
      mt="0.3px"
      borderBottomRadius="lg"
      borderColor="white"
      zIndex="1"
      bgColor="white"
      boxShadow={"lg"}
      overflow="hidden"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {filteredArray.map((elem, index) => (
        <UserFoundCard elem={elem} key={index} />
      ))}
    </Box>
  );
};
