import { Avatar, Box, Stack } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks";
import { AddTodoModal } from "../Todos/AddTodoModal";

interface HoverColor {
  hoverColor: string;
}

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
      >
        <AddTodoModal color="white" />
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
