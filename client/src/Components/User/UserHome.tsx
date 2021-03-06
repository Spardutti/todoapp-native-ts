import { Center, Stack } from "@chakra-ui/react";
import { NewUser } from "./NewUser";
import { LocalUser } from "./LocalUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TestUser from "./TestUser";

/* RENDERS THE LOGIN PAGE OR
REDIRECTS TO HOMEPAGE IS USER IS LOGGED IN */
export const UserHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("todoToken");
    if (token) navigate("/home");
  }, [navigate]);

  return (
    <Center h={"100vh"}>
      <Stack
        direction={"column"}
        textAlign={"center"}
        w={560}
        fontSize={30}
        p={10}
        boxShadow="lg"
        bg="#fafafa"
      >
        <LocalUser />
        <TestUser />
        <NewUser />
      </Stack>
    </Center>
  );
};
