import {
  Button,
  Divider,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocalUser } from "../../api/User/post_user";
import { useNavigate } from "react-router-dom";

export const LocalUser = () => {
  const [err, setErr] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e: any) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const { mutateAsync, error, data } = useLocalUser();

  const localLogin = async () => {
    await mutateAsync(userInfo).catch((error) => setErr(error));
  };

  if (error) {
    return (
      <>
        <Text>Please log in to continue</Text>
        <FormLabel textAlign={"center"}>{err}</FormLabel>
        <Input
          name="email"
          value={userInfo.email}
          onChange={(e) => onChange(e)}
          placeholder="email"
          type={"email"}
        />
        <Input
          name="password"
          value={userInfo.password}
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
        value={userInfo.email}
        onChange={(e) => onChange(e)}
        placeholder="email"
        type={"email"}
      />
      <Input
        name="password"
        value={userInfo.password}
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
