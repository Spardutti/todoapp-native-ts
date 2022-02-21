import { Stack } from "@chakra-ui/react";
import React from "react";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Stack align={"center"} pt={20}>
      {children}
    </Stack>
  );
};

export default Layout;
