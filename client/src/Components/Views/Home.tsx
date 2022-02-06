import { Box, Grid } from "@chakra-ui/react";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import Today from "../Today/Today";

export const Home = () => {
  return (
    <Grid templateColumns={["  10fr"]}>
      {/* <Box></Box> */}
      <Box mx="auto">
        <Today />
      </Box>
    </Grid>
  );
};
