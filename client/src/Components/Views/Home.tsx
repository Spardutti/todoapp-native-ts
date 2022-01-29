import { Box, Stack } from "@chakra-ui/react";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { useAppSelector } from "../../hooks";
import Today from "../Today/Today";

export const Home = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <Stack direction={"row"}>
      <DrawerMenu />
      {user._id && <Today userId={user._id} />}
    </Stack>
  );
};
