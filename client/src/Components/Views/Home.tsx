import { Box } from "@chakra-ui/react";
import { useState } from "react";
import DrawerMenu from "../DrawerMenu/DrawerMenu";

export const Home = () => {
  const [drawer, setDrawer] = useState(true);
  return (
    <Box>
      <p>Home</p>
      <DrawerMenu />
    </Box>
  );
};
