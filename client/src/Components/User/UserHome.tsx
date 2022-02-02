import { Center, Stack, Text } from "@chakra-ui/react";
import { NewUser } from "./NewUser";
import { LocalUser } from "./LocalUser";

export const UserHome = () => {
  return (
    <Center pt={10}>
      <Stack direction={"column"} textAlign={"center"}>
        <LocalUser />
        <Text>Dont have an account ?</Text>
        <NewUser />
      </Stack>
    </Center>
  );
};
