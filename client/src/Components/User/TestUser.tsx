import { Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useLocalUser } from "../../api/User/post_user";

interface DemoUserProps {}

const TestUser: React.FC<DemoUserProps> = () => {
  const { mutateAsync, isLoading } = useLocalUser();

  const useTestuser = async () => {
    const userCredentials = {
      email: "test@gmail.com",
      password: "12345",
    };
    const info = await mutateAsync(userCredentials);

    if (info) {
      localStorage.setItem("todoToken", info.data.token);
    }
  };

  return (
    <Stack>
      <Text fontSize={25}>Use our test user</Text>
      <Button isLoading={isLoading} onClick={useTestuser} colorScheme={"red"}>
        Test user
      </Button>
    </Stack>
  );
};

export default TestUser;
