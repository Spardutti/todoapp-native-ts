import React, { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
//import { User } from "../../Interface/Interface";
import { useGetAllUsers } from "../../api/User/get_user";

interface Info {
  searchInfo: string;
  setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
}

interface User {
  email: string;
  friendRequest: [];
  friends: [];
  username: string;
  _id: string;
}

export const MatchedUsersModal: React.FC<Info> = ({
  searchInfo,
  setSearchStatus,
}) => {
  const { data: users } = useGetAllUsers();
  const [filteredArray, setFilteredArray] = useState<User[]>([]);

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
  }, [searchInfo]);

  useEffect(() => {
    if (filteredArray.length > 0) {
      setSearchStatus("none");
      console.log(0);
    } else {
      setSearchStatus("lg");
      console.log(1);
    }
  }, [filteredArray]);

  return (
    <Box
      maxH="150px"
      position="absolute"
      mt="0.4px"
      borderBottomRadius="lg"
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
        <Flex key={index} width="300px" _hover={{ background: "#E2E8F0" }}>
          <Text pl={0.5} width="70%" maxH="25px" overflow="hidden">
            {elem.username}
          </Text>
          <Text width="30%" textAlign="end" pr="0.5">
            Friends
          </Text>
        </Flex>
      ))}
    </Box>
  );
};
