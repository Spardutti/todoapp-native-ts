import { Box } from "@chakra-ui/react";
import React from "react";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box w={900} mx="auto" pt={20}>
      {children}
    </Box>
  );
};

export default Layout;
