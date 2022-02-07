import { Button, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useNewuser } from "../../api/User/post_user";

/* DISPLAY A FORM TO CREATE A NEW USER */
export const NewUser = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
  });

  const onChange = (e: any) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  /* POST THE DATA TO CREATE A NEW USER */
  const { mutateAsync, isLoading, error } = useNewuser();

  const createUser = async () => {
    await mutateAsync(userInfo);
  };

  if (isLoading) return <div>loading </div>;

  /* DISPLAY VALIDATION ERRORS */
  if (error) {
    return (
      <>
        <FormLabel>{error.data.username}</FormLabel>
        <Input
          onChange={(e) => onChange(e)}
          name="username"
          value={userInfo.username}
          placeholder="Username"
        />
        <FormLabel>{error.data.email}</FormLabel>
        <Input
          onChange={(e) => onChange(e)}
          name="email"
          value={userInfo.email}
          placeholder="email"
        />
        <Input
          onChange={(e) => onChange(e)}
          name="password"
          value={userInfo.password}
          placeholder="Password"
        />
      </>
    );
  }

  return (
    <Stack>
      <Input
        onChange={(e) => onChange(e)}
        name="username"
        value={userInfo.username}
        placeholder="Username"
      />
      <Input
        onChange={(e) => onChange(e)}
        name="email"
        value={userInfo.email}
        placeholder="email"
        type={"email"}
      />
      <Input
        onChange={(e) => onChange(e)}
        name="password"
        value={userInfo.password}
        placeholder="Password"
        type={"password"}
      />
      <Button onClick={createUser} colorScheme={"blue"}>
        Create{" "}
      </Button>
    </Stack>
  );
};
