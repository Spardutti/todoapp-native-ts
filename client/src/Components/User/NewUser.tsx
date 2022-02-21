import { Button, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNewuser } from "../../api/User/post_user";

/* DISPLAY A FORM TO CREATE A NEW USER */
export const NewUser = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [showErrors, setShowErrors] = useState(false);

  /* POST THE DATA TO CREATE A NEW USER */
  const { mutateAsync, isLoading, error } = useNewuser();

  const onChange = (e: any) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
    setShowErrors(false);
  };

  const createUser = async () => {
    const createdAcount = await mutateAsync(userInfo);
    toast.success("Account created succesfully!");
    setUserInfo({
      username: "",
      password: "",
      email: "",
    });
  };
  const { username, password, email } = userInfo;

  if (isLoading) return <div>loading </div>;

  /* DISPLAY VALIDATION ERRORS */
  if (error) {
    return (
      <>
        <FormLabel>{error.data.username}</FormLabel>
        <Input
          onChange={(e) => onChange(e)}
          name="username"
          value={username}
          placeholder="Username"
        />
        <FormLabel>{error.data.email}</FormLabel>
        <Input
          onChange={(e) => onChange(e)}
          name="email"
          value={email}
          placeholder="email"
        />
        <Input
          onChange={(e) => onChange(e)}
          name="password"
          value={password}
          placeholder="Password"
        />
        <Button onClick={createUser} colorScheme={"blue"}>
          Create{" "}
        </Button>
      </>
    );
  }

  return (
    <Stack>
      <Text>Dont have an account ?</Text>

      <Input
        onChange={(e) => onChange(e)}
        name="username"
        value={username}
        placeholder="Username"
      />
      <Input
        onChange={(e) => onChange(e)}
        name="email"
        value={email}
        placeholder="email"
        type={"email"}
      />
      <Input
        onChange={(e) => onChange(e)}
        name="password"
        value={password}
        placeholder="Password"
        type={"password"}
      />
      {username && email && password ? (
        <Button onClick={createUser} colorScheme={"blue"}>
          Create{" "}
        </Button>
      ) : (
        <Button disabled colorScheme={"blue"}>
          Create{" "}
        </Button>
      )}
    </Stack>
  );
};
