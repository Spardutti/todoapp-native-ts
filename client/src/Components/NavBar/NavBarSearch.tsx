import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export const NavBarSearch = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <Box>
      <InputGroup
        _hover={{
          background: "white",
          color: "black",
        }}
        h={8}
        bg={"gray.300"}
        borderRadius={10}
        color={"white"}
      >
        <InputLeftElement
          h={8}
          pointerEvents="none"
          children={<BsSearch color="gray.300" />}
        />
        <Input
          color="black"
          h={8}
          fontSize={15}
          placeholder="Search"
          _placeholder={{ color: "white" }}
          _hover={{
            _placeholder: { color: "black" },
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>
    </Box>
  );
};
