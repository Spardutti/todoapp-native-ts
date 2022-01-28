import { Box } from "@chakra-ui/react";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
import { useAppSelector } from "../../hooks";

export const Home = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <Box>
      <p>Home</p>
      <p>hola</p>
      <p>{user.username}</p>
      <DrawerMenu />
    </Box>
  );
};
