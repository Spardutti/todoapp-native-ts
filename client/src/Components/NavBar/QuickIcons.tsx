import { Avatar, Box, Stack } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks";
import { AddTodoModal } from "../Todos/AddTodoModal";

interface HoverColor {
  hoverColor: string;
}

/* DISPLAY THE ADD TODO AND AVATAR
ONT HE NAV BAR */
export const QuickIcons: React.FC<HoverColor> = ({ hoverColor }) => {
  const user = useAppSelector((state) => state.user);

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Box
        p={1}
        borderRadius={5}
        _hover={{
          background: hoverColor,
        }}
        textAlign={"center"}
      >
        <AddTodoModal color="white" text="" />
      </Box>
      {user && (
        <Avatar
          name={user.username}
          size={"sm"}
          src="#"
          bg="white"
          border="2px"
          color={"green.400"}
          cursor={"pointer"}
        />
      )}
    </Stack>
  );
};
