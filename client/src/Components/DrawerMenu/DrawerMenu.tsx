import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { toggleDrawer } from "../../store/Reducers/Drawer/drawerReducer";
import { RootState } from "../../store/store";
import { HiOutlineInbox } from "react-icons/hi";

const DrawerMenu: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);
  const { onClose } = useDisclosure({ id: "draw" });
  const dispatch = useAppDispatch();

  const toggle = () => dispatch(toggleDrawer());

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
              <Box>
                <Text>3</Text>
              </Box>
            </HStack>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
