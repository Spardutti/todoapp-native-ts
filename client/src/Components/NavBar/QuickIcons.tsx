import { Avatar, Box, Stack } from "@chakra-ui/react";
import { useAppSelector } from "../../hooks";
import { AddTodoModal } from "../Todos/AddTodoModal";
import { ImSwitch } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { AiOutlineLineChart } from "react-icons/ai";

interface HoverColor {
  hoverColor: string;
}

/* DISPLAY THE ADD TODO AND AVATAR
ONT HE NAV BAR */
export const QuickIcons: React.FC<HoverColor> = ({ hoverColor }) => {
  const user = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("todoToken");
    queryClient.invalidateQueries();
    navigate("/");
  };

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
        <AddTodoModal preSelectedDate={null} color="white" text="" />
      </Box>
      <Box
        p={2}
        borderRadius={5}
        _hover={{
          background: hoverColor,
        }}
        cursor="pointer"
      >
        <AiOutlineLineChart color="white" fontSize={20} />
      </Box>
      <Box
        p={2}
        borderRadius={5}
        _hover={{
          background: hoverColor,
        }}
        textAlign={"center"}
        cursor="pointer"
        onClick={logout}
      >
        <ImSwitch color="white" fontSize={20} />
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
