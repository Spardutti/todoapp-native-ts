import { Box, Stack } from "@chakra-ui/react";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { useAppSelector } from "../../hooks";
import Today from "../Today/Today";
import { Token } from "../../store/Reducers/Token/tokenReducer";

export const Home = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <Stack direction={"row"}>
      <DrawerMenu />
      <Today />
    </Stack>
  );
};
