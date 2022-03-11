import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Center,
  CloseButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAppSelector } from "../../hooks";
import { AddTodoModal } from "../Todos/AddTodoModal";
import { ImSwitch } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { AiOutlineLineChart } from "react-icons/ai";
import { useEffect, useState } from "react";

interface HoverColor {
  hoverColor: string;
}

/* DISPLAY THE ADD TODO AND AVATAR
ONT HE NAV BAR */
export const QuickIcons: React.FC<HoverColor> = ({ hoverColor }) => {
  const user = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [test, setTest] = useState(false);

  const navigate = useNavigate();

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("todoToken");
    queryClient.invalidateQueries();
    navigate("/");
  };

  useEffect(() => {
    if (user.username === "test") setTest(true);
    return () => {
      setTest(false);
    };
  }, [user]);

  const onClick = () => setTest(false);

  if (test) {
    return (
      <Box zIndex={100} pos={"fixed"} left={0} right={0} bottom={0} top={0}>
        <Center w="100%" h="100%" px={10}>
          <Alert
            status="info"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon />
            <AlertTitle mr={2}>
              This account is for demostrative purposes only. Please do not
              enter any personal or offensive information.
            </AlertTitle>
            <Button onClick={onClick} mt={2} colorScheme={"blue"}>
              Accept
            </Button>
          </Alert>
        </Center>
      </Box>
    );
  }

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
        onClick={() => navigate("/history")}
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
