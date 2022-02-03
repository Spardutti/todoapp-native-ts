import { Box, Stack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { NavBarSearch } from "./NavBarSearch";
import { QuickIcons } from "./QuickIcons";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../store/Reducers/Drawer/drawerReducer";
import { useNavigate } from "react-router-dom";
import DrawerMenu from "../DrawerMenu/DrawerMenu";

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoverColor] = useState("#ffffff75");

  const { onOpen } = useDisclosure({ id: "draw" });
  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      bg={"red.500"}
      h={12}
      px={10}
    >
      <Box
        onClick={() => dispatch(toggleDrawer())}
        color={"white"}
        cursor={"pointer"}
        p={1}
        borderRadius={5}
        _hover={{
          background: hoverColor,
        }}
      >
        <GiHamburgerMenu />
      </Box>

      <Stack w="50%" direction={"row"} alignItems={"center"}>
        <Box
          p={1}
          borderRadius={5}
          _hover={{
            background: hoverColor,
          }}
        >
          <AiOutlineHome
            fontSize={20}
            color="white"
            cursor={"pointer"}
            // onClick={() => navigate("/home")}
            onClick={onOpen}
          />
        </Box>
        <NavBarSearch />
      </Stack>
      <Stack justify={"end"} w="50%" direction={"row"} alignItems={"center"}>
        <QuickIcons hoverColor={hoverColor} />
      </Stack>
      <DrawerMenu />
    </Stack>
  );
};
