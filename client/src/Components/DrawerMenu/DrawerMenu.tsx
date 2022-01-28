import { Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const DrawerMenu: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);

  const AnimatedBox = motion(Box);
  return (
    <AnimatePresence>
      {isOpen && (
        <AnimatedBox
          h={400}
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          exit={{ width: 0 }}
          transition={{
            duration: 0.3,
          }}
          bg={"green"}
          overflow="hidden"
        ></AnimatedBox>
      )}
    </AnimatePresence>
  );
};

export default DrawerMenu;
