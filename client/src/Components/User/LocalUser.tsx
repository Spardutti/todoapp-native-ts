import {
  Button,
  Divider,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useLocalUser } from "../../api/User/post_user";
import { userContext } from "../../Context/UserContext";

export const LocalUser = () => {
  const [, setErr] = useState("");
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(userContext);

  /* ONCHANGE HANDLER */
  const onChange = (e: any) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const { mutateAsync, error } = useLocalUser();

  /* LOGIN USER AND GET DATA FROM DB */
  const localLogin = async () => {
    const info = await mutateAsync(userCredentials).catch((error) =>
      setErr(error)
    );
    localStorage.setItem("todoToken", info.data.token);
    setUser(info.data.user);
  };

  if (error) {
    return (
      /* DISPLAY ERRORS */
      <>
        <Text>Please log in to continue</Text>
        <FormLabel textAlign={"center"}>{error.data}</FormLabel>
        <Input
          name="email"
          value={userCredentials.email}
          onChange={(e) => onChange(e)}
          placeholder="email"
          type={"email"}
        />
        <Input
          name="password"
          value={userCredentials.password}
          onChange={(e) => onChange(e)}
          placeholder="Password"
          type="password"
        />
        <Button onClick={localLogin} colorScheme={"blue"}>
          Log in
        </Button>
        <Divider />
      </>
    );
  }

  return (
    <Stack>
      <Text>Please log in to continue</Text>
      <Input
        name="email"
        value={userCredentials.email}
        onChange={(e) => onChange(e)}
        placeholder="email"
        type={"email"}
      />
      <Input
        name="password"
        value={userCredentials.password}
        onChange={(e) => onChange(e)}
        placeholder="Password"
        type="password"
      />
      <Button onClick={localLogin} colorScheme={"blue"}>
        Log in
      </Button>
      <Divider />
    </Stack>
  );
};
