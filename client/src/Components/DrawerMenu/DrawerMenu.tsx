import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { toggleDrawer } from "../../store/Reducers/Drawer/drawerReducer";
import { RootState } from "../../store/store";
import { HiOutlineInbox } from "react-icons/hi";
import { DateTime } from "luxon";

/* DISPLAY A DRAWER MENU THAT OPENS FROM THE LEFT */
const DrawerMenu: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);

  const { onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const toggle = () => dispatch(toggleDrawer());

  const Calendar = () => {
    const today = DateTime.now().day;
    return (
      <Stack
        align={"center"}
        w={4}
        h={5}
        border="1px"
        borderColor={"blue"}
        borderRadius={2}
        ml={0.5}
      >
        <Box pt={1}>
          <Divider borderColor={"blue"} />
          <Text fontSize={10} color="blue">
            {today}
          </Text>
        </Box>
      </Stack>
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
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody bg={"#fafafa"} p={10}>
            <HStack justify={"space-between"}>
              <HStack>
                <HiOutlineInbox fontSize={20} color="blue" />
                <Text>Inbox</Text>
              </HStack>
              {/*   <Box>
                <Text>3</Text>
              </Box> */}
            </HStack>
            <Calendar />
            <p>Upcoming</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
