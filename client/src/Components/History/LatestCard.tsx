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

interface LatestCardProps {
  todo: Todo;
}

const LatestCard: React.FC<LatestCardProps> = ({ todo }) => {
  /* SHOW COMPLETED BADGE */
  const AvatarDisplay = () => {
    if (todo.isCompleted) {
      return (
        <HStack>
          <Avatar name={todo.author.username}>
            <AvatarBadge boxSize={"1.25em"} bg="green" border="none">
              <AiOutlineCheck />
            </AvatarBadge>
          </Avatar>
          <Text>You completed: {todo.todoName}</Text>
        </HStack>
      );
    }

    if (todo.updateDate) {
      return (
        <HStack>
          <Avatar name={todo.author.username}>
            <AvatarBadge boxSize={"1.25em"} bg="blue" border="none">
              <MdOutlineRefresh />
            </AvatarBadge>
          </Avatar>
          <Text>You updated: {todo.todoName}</Text>
        </HStack>
      );
    }

    return (
      <HStack>
        <Avatar name={todo.author.username}>
          <AvatarBadge boxSize={"1.25em"} bg="orange" border="none">
            <AiOutlinePlus />
          </AvatarBadge>
        </Avatar>
        <Text>You added: {todo.todoName}</Text>
      </HStack>
    );
  };

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
        <Button bg={todo.category.color}>{todo.category.categoryName}</Button>
      </Flex>
    </Grid>
  );
};

export default LatestCard;
