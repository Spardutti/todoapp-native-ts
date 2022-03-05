import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

interface SpinnerProps {}

const LoadingSpinner: React.FC<SpinnerProps> = () => {
  return (
    <Center h={500}>
      <Spinner
        thickness="4px"
        speed="0.9s"
        emptyColor="gray.200"
        color="red.500"
        size="xl"
      />
    </Center>
  );
};

export default LoadingSpinner;
