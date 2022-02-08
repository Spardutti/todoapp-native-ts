import {
  background,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleDrawer } from "../../store/Reducers/Drawer/drawerReducer";
import { RootState } from "../../store/store";
import { HiOutlineInbox } from "react-icons/hi";
import { DateTime } from "luxon";
import { BsCalendar2Week } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

/* DISPLAY A DRAWER MENU THAT OPENS FROM THE LEFT */
const DrawerMenu: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
  const overdue = useAppSelector((state) => state.todos.overdue);
  const todayTodos = useAppSelector((state) => state.todos.today);

  const navigate = useNavigate();

  const { onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const toggle = () => dispatch(toggleDrawer());

  const navigateTo = (url: string) => {
    navigate(url);
    toggle();
  };

  const Calendar = () => {
    const today = DateTime.now().day;
    return (
      <Box pl={0.5}>
        <Box
          w={4}
          h={1}
          bg="white"
          borderTopRadius={3}
          border="1px"
          borderColor={"#058527"}
        ></Box>
        <Stack
          justify="center"
          w={4}
          h={3}
          bg="white"
          mt={0.8}
          borderBottomRadius={3}
          border="1px"
          borderColor={"#058527"}
        >
          <Text color="#058527" fontSize={10} textAlign="center">
            {today < 10 ? "0" + today : today}
          </Text>
        </Stack>
      </Box>
    );
  };
  return (
    <>
      <Drawer
        id="draw"
        placement={"left"}
        onClose={toggle}
        isOpen={isOpen}
        onOverlayClick={onClose}
      >
        <DrawerOverlay bg="none" />
        <DrawerContent>
          <DrawerBody bg={"#FAFAFA"} p={10}>
            <Flex
              _hover={{ background: "#ECECEC" }}
              cursor={"pointer"}
              p={2}
              alignItems={"center"}
              borderRadius={5}
            >
              <HiOutlineInbox size={20} color="blue" />
              <Text pl={3}>Inbox</Text>
              <Spacer />
              <Text color="#C1DAEC">{overdue === 0 ? null : overdue}</Text>
            </Flex>
            <Flex
              _hover={{ background: "#ECECEC" }}
              cursor={"pointer"}
              p={2}
              alignItems={"center"}
              borderRadius={5}
              onClick={() => navigateTo("/home")}
            >
              <Calendar />
              <Text pl={3}>Today</Text>
              <Spacer />

              <Text color="#DD4B39">
                {todayTodos + overdue === 0 ? null : todayTodos + overdue}
              </Text>
            </Flex>
            <Flex
              _hover={{ background: "#ECECEC" }}
              cursor={"pointer"}
              pl={0.5}
              p={2}
              alignItems={"center"}
              borderRadius={5}
              onClick={() => navigateTo("/upcoming")}
            >
              <BsCalendar2Week size={16} color="#692FC2" />
              <Text pl={3}>Upcoming</Text>
              <Spacer />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
