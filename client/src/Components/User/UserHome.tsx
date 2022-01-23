import {
  Box,
  Button,
  Center,
  Divider,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewUser } from "./NewUser";

export const UserHome = () => {
  const [user, setUser] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    user ? navigate("/home") : navigate("/");
  }, []);

  return (
    <Center pt={10}>
      <Stack direction={"column"} textAlign={"center"}>
        <Text>Please log in to continue</Text>
        <Input placeholder="Username" />
        <Input placeholder="Password" />
        <Button colorScheme={"blue"}>Log in</Button>
        <Divider />
        <Text>Dont have an account ?</Text>
        <NewUser />
      </Stack>
    </Center>
  );
};
