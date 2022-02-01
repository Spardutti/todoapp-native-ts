import { Box, Grid, Stack } from "@chakra-ui/react";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import Today from "../Today/Today";

export const Home = () => {
  return (
    <Grid templateColumns={"2fr 10fr"}>
      <DrawerMenu />
      <Today />
    </Grid>
  );
};
