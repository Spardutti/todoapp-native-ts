import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Text,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BsCalendar4Event } from "react-icons/bs";
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
        <PopoverContent width="250px" height="479px">
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
            height="105px"
            px="0px"
            py="4px"
            borderBottom="1px"
            borderColor="blackAlpha.200"
          ></PopoverBody>
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
