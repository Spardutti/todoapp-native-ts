import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { Todo } from "../../Interface/Interface";
import { MdOutlineRefresh } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface LatestCardProps {
  todo: Todo;
}

const LatestCard: React.FC<LatestCardProps> = ({ todo }) => {
  /* SHOW COMPLETED BADGE */
  const AvatarDisplay = () => {
    if (todo.updateType === "Created") {
      return (
        <HStack>
          <Avatar
            name={todo.author.username}
            size={"md"}
            src="#"
            bg="white"
            border="2px"
            color={"green.400"}
          >
            <AvatarBadge
              color="white"
              boxSize={"1.25em"}
              bg="orange"
              border="none"
            >
              <AiOutlinePlus />
            </AvatarBadge>
          </Avatar>
          <Text>You added: {todo.todoName}</Text>
        </HStack>
      );
    }
    /* SHOW UPDATED BADGE */
    if (todo.updateType === "Completed") {
      return (
        <HStack>
          <Avatar
            name={todo.author.username}
            size={"md"}
            src="#"
            bg="white"
            border="2px"
            color={"green.400"}
          >
            <AvatarBadge
              color="white"
              boxSize={"1.25em"}
              bg="green"
              border="none"
            >
              <AiOutlineCheck />
            </AvatarBadge>
          </Avatar>
          <Text>You completed: {todo.todoName}</Text>
        </HStack>
      );
    }

    /* SHOW ADDED BADGE */
    return (
      <HStack>
        <Avatar
          name={todo.author.username}
          size={"md"}
          src="#"
          bg="white"
          border="2px"
          color={"green.400"}
          cursor={"pointer"}
        >
          <AvatarBadge color="white" boxSize={"1.25em"} bg="blue" border="none">
            <MdOutlineRefresh />
          </AvatarBadge>
        </Avatar>
        <Text>You updated: {todo.todoName}</Text>
      </HStack>
    );
  };

  const navigate = useNavigate();

  return (
    <Grid
      templateColumns={" 8fr 2fr"}
      borderTop={"1px"}
      borderBottom="1px"
      py={2}
      borderColor="gray.100"
      h={70}
    >
      <AvatarDisplay />

      <Flex align={"center"}>
        <Button
          onClick={() => navigate(`/category/${todo.category._id}`)}
          bg={todo.category.color}
        >
          {todo.category.categoryName}
        </Button>
      </Flex>
    </Grid>
  );
};

export default LatestCard;
