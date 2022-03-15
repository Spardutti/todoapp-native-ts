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
import { DateTime } from "luxon";

interface LatestCardProps {
  todo: Todo;
}

const LatestCard: React.FC<LatestCardProps> = ({ todo }) => {
  /* SHOW ADDED BADGE */
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
          <Box>
            <Text fontSize={13}>
              <b>You</b> created task:{" "}
              <span style={{ color: "gray" }}>{todo.todoName}</span>
            </Text>
            <Text color="gray" fontSize={11}>
              {DateTime.fromISO(todo.updated).monthShort}{" "}
              {DateTime.fromISO(todo.updated).day}
            </Text>
          </Box>
        </HStack>
      );
    }
    /* SHOW COMPLETED BADGE */
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
          <Box>
            <Text fontSize={13}>
              <b>You</b> completed a task:{" "}
              <span style={{ color: "gray" }}>{todo.todoName}</span>
            </Text>
            <Text color="gray" fontSize={11}>
              {DateTime.fromISO(todo.updated).monthShort}{" "}
              {DateTime.fromISO(todo.updated).day}
            </Text>
          </Box>
        </HStack>
      );
    }

    /* SHOW UPDATED BADGE */
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
        <Box>
          <Text fontSize={13}>
            <b>You</b> updated task:{" "}
            <span style={{ color: "gray" }}>{todo.todoName}</span>
          </Text>
          <Text color="gray" fontSize={11}>
            {DateTime.fromISO(todo.updated).monthShort}{" "}
            {DateTime.fromISO(todo.updated).day}
          </Text>
        </Box>
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
        <Text
          onClick={() => navigate(`/category/${todo.category._id}`)}
          color={todo.category.color}
          cursor="pointer"
        >
          {todo.category.categoryName}
        </Text>
      </Flex>
    </Grid>
  );
};

export default LatestCard;
