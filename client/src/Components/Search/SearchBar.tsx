import React, { useState, useEffect } from "react";
import { Box, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import { MatchedUsersModal } from "./MatchedUsersModal";

export const SearchBar: React.FC = () => {
  const [searchInfo, setSearchInfo] = useState("");
  const [searchStatus, setSearchStatus] = useState("lg");

  /* const UsersMatchedBox = () => {
    return (
      <Flex>
        {filteredArray.map((username) => (
          <Text>{username}</Text>
        ))}
      </Flex>
    );
  }; */

  useEffect(() => {
    console.log(searchStatus);
  }, [searchStatus]);

  return (
    <>
      <Flex display="column">
        <InputGroup>
          <Input
            bgColor="white"
            width={300}
            size="xs"
            bg="white"
            onChange={(e) => setSearchInfo(e.target.value)}
            borderTopRadius="lg"
            borderBottomRadius={searchStatus}
            _focus={{ outline: "none" }}
          />
        </InputGroup>
        <MatchedUsersModal
          searchInfo={searchInfo}
          setSearchStatus={setSearchStatus}
        />
      </Flex>
    </>
  );
};

/* REACT SEARCH */
