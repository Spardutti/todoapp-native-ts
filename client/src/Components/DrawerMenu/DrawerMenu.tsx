import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { toggleDrawer } from "../../store/Reducers/Drawer/drawerReducer";
import { RootState } from "../../store/store";

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
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
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
