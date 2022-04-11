import { Box, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { NavBarSearch } from "./NavBarSearch";
import { QuickIcons } from "./QuickIcons";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../store/Reducers/Drawer/drawerReducer";
import { useNavigate } from "react-router-dom";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { SearchBar } from "../Search/SearchBar";

/* DISPLAYS A TOP NAVIGATION BAR */
export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoverColor] = useState("#ffffff75");

  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      bg={"red.500"}
      h={12}
      px={[4, 4, 10]}
      w={"100%"}
      position="fixed"
      zIndex={100}
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
            onClick={() => navigate("/home")}
          />
        </Box>
        <SearchBar />
      </Stack>
      <Stack justify={"end"} w="50%" direction={"row"} alignItems={"center"}>
        <QuickIcons hoverColor={hoverColor} />
      </Stack>
      <DrawerMenu />
    </Stack>
  );
};
