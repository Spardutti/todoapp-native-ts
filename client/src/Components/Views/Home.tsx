import { Box, Grid } from "@chakra-ui/react";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import Today from "../Today/Today";

export const Home = () => {
  return (
    <Box>
      {/* <Box></Box> */}
      <Box mx="auto">
        <Today />
      </Box>
    </Box>
  );
};
