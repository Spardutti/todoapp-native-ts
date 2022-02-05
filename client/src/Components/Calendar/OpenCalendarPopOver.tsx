import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Text,
  Box,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  BsCalendar4Event,
  BsFillCalendar2RangeFill,
  BsSlashCircle,
} from "react-icons/bs";
import { FaCouch } from "react-icons/fa";
import { CgCalendarNext } from "react-icons/cg";
import React, { useState } from "react";
import "../../Styles/calendar/calendarButton.scss";

export const OpenCalendarPopOverButton = () => {
  const [pickedDate, setPickedDate] = useState(new Date());

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <BsCalendar4Event color="green" />
        </PopoverTrigger>
        <PopoverContent width="250px" height="533px">
          <PopoverHeader
            width="250px"
            height="43px"
            py="8px"
            paddingLeft="13px"
            paddingRight="10px"
            borderColor="blackAlpha.200"
          >
            <Text fontSize="13px">{pickedDate.toString().slice(4, 10)}</Text>
          </PopoverHeader>
          <PopoverBody
            width="250px"
            height="161px"
            px="0px"
            py="4px"
            borderBottom="1px"
            borderColor="blackAlpha.200"
          >
            <Box px="10px" py="4px" height="38px" display="flex">
              <Box width="24px" height="24px" mr="10px" padding="4px">
                <BsFillCalendar2RangeFill color="green" />
              </Box>
              <Box maxW="100px">
                <Text fontSize="sm" fontWeight="500">
                  Tomorrow
                </Text>
              </Box>
            </Box>
            <Box px="10px" py="4px" height="38px" display="flex">
              <Box width="24px" height="24px" mr="10px" padding="4px">
                <FaCouch color="skyblue" />
              </Box>
              <Box maxW="100px">
                <Text fontSize="sm" fontWeight="500">
                  Next weekend
                </Text>
              </Box>
              <Box></Box>
            </Box>
            <Box px="10px" py="4px" height="38px" display="flex">
              <Box width="24px" height="24px" mr="10px" padding="4px">
                <CgCalendarNext color="purple" />
              </Box>
              <Box maxW="100px">
                <Text fontSize="sm" fontWeight="500">
                  Next week
                </Text>
              </Box>
            </Box>
            <Box px="10px" py="4px" height="38px" display="flex">
              <Box width="24px" height="24px" mr="10px" padding="4px">
                <BsSlashCircle color="grey" />
              </Box>
              <Box maxW="100px">
                <Text fontSize="sm" fontWeight="500">
                  No date
                </Text>
              </Box>
            </Box>
          </PopoverBody>
          <PopoverBody padding="0px">
            <Calendar
              onChange={setPickedDate}
              value={pickedDate}
              className="calendar"
            />
          </PopoverBody>
          <PopoverBody height="40px" py="8px" px="10px">
            <Text
              textColor="#d1453b"
              fontWeight="600"
              fontSize="13px"
              fontFamily="inherit"
            >
              + Añadir hora
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
