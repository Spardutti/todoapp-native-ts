import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import preview1 from "../../Images/preview1.png";
import { FaClipboardList } from "react-icons/fa";

interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("todoToken");
    if (token) navigate("/home");
  }, [navigate]);

  const TopBar = () => {
    return (
      <Flex
        p={[5]}
        py={1}
        align="center"
        position={"fixed"}
        w="100%"
        backgroundColor={"#fff"}
        zIndex="100"
      >
        <HStack>
          <FaClipboardList color="red" size={"50"} />
          <Text fontWeight={"bold"}>Tasker</Text>
        </HStack>
        <Flex justify={"space-around"} ml={"auto"} w={[200, 200, 300]}>
          <Button
            fontSize={[20, 25, 30]}
            fontWeight="normal"
            variant={"ghost"}
            _hover={{
              background: "#FAFAFA",
              borderBottom: "2px",
              borderColor: "red",
            }}
            py={10}
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button
            py={10}
            fontSize={[20, 25, 30]}
            fontWeight="normal"
            variant={"ghost"}
            _hover={{
              background: "#FAFAFA",
              borderBottom: "2px",
              borderColor: "red",
            }}
            onClick={() => navigate("/login")}
          >
            Sign up
          </Button>
        </Flex>
      </Flex>
    );
  };

  const Title = () => {
    return (
      <Center w={"100vw"} h={"80vh"}>
        <Stack align={"center"}>
          <Heading textAlign={"center"} fontSize={[45, 65, 100, 120]}>
            Organize it all <br /> with Tasker <br />
          </Heading>
          <Box pt={20}>
            <Button
              px={[5, 5, 10]}
              py={[8, 10, 14]}
              colorScheme={"red"}
              fontSize={[30, 40, 50]}
              onClick={() => navigate("/login")}
            >
              Get started
            </Button>
          </Box>
        </Stack>
      </Center>
    );
  };

  const PreviewImg = () => {
    return (
      <Box mb={10} boxShadow={"2xl"} w="90%" mx="auto" borderRadius={"2xl"}>
        <Image src={preview1} w="100%" borderRadius="2xl" />
      </Box>
    );
  };

  return (
    <Box bg="#FAFAFA">
      <TopBar />
      <Title />
      <PreviewImg />
    </Box>
  );
};

export default Welcome;
