import {
  Button,
  Divider,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocalUser } from "../../api/User/post_user";
import { RiTodoLine } from "react-icons/ri";

/* DISPLAY A FORM TO LOGIN WITH EMAIL AND PASSWORD */
export const LocalUser = () => {
  const [, setErr] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  /* ONCHANGE HANDLER */
  const onChange = (e: any) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const { mutateAsync, error, isLoading } = useLocalUser();

  /* LOGIN USER AND GET DATA FROM DB */
  const localLogin = async () => {
    const info = await mutateAsync(userCredentials).catch((error) =>
      setErr(error)
    );
    if (info) {
      localStorage.setItem("todoToken", info.data.token);
    }
  };

  /* DISPLAY VALIDATION ERRORS */
  if (error) {
    return (
      <>
        <HStack color="red">
          <RiTodoLine fontSize={40} />
          <Text fontWeight={"bold"}>Tasker</Text>
        </HStack>
        <FormLabel textAlign={"center"}>{error.data}</FormLabel>
        <Input
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          placeholder="email"
          type={"email"}
        />
        <Input
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          placeholder="Password"
          type="password"
        />
        {isLoading ? (
          <Button
            mt={2}
            w={40}
            colorScheme="teal"
            isLoading
            loadingText="Submitting"
          />
        ) : (
          <Button onClick={localLogin} colorScheme={"red"}>
            Log in
          </Button>
        )}
        <Divider />
      </>
    );
  }

  return (
    <Stack>
      <HStack color="red">
        <RiTodoLine fontSize={40} />
        <Text fontWeight={"bold"}>Tasker</Text>
      </HStack>
      <Text textAlign={"left"}>Log in</Text>
      <Input
        name="email"
        value={email}
        onChange={(e) => onChange(e)}
        placeholder="email"
        type={"email"}
      />
      <Input
        name="password"
        value={password}
        onChange={(e) => onChange(e)}
        placeholder="Password"
        type="password"
      />
      {email && password ? (
        isLoading ? (
          <Button colorScheme="red" isLoading loadingText="Loading" />
        ) : (
          <Button onClick={localLogin} colorScheme={"red"}>
            Log in
          </Button>
        )
      ) : (
        <Button disabled colorScheme={"red"}>
          Log in
        </Button>
      )}
      <Divider />
    </Stack>
  );
};
