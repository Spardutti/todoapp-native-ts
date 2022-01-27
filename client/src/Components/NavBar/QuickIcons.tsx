import { Avatar, Box, Stack } from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";

interface HoverColor {
  hoverColor: string;
}

export const QuickIcons: React.FC<HoverColor> = ({ hoverColor }) => {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Box
        p={1}
        borderRadius={5}
        _hover={{
          background: hoverColor,
        }}
      >
        <IoAddOutline color="white" fontSize={25} cursor={"pointer"} />
      </Box>
      <Avatar
        name="Damian Spagnuolo"
        size={"sm"}
        src="#"
        bg="white"
        border="2px"
        color={"green.400"}
        cursor={"pointer"}
      />
    </Stack>
  );
};
