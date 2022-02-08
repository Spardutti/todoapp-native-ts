import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Text,
  Box,
  Button,
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
import React, { useEffect, useState } from "react";
import "../../Styles/calendar/calendarButton.scss";
import { DateTime } from "luxon";
import { TomorrowCalendarButton } from "./TomorrowCalendarButton";
import { TodayCalendarButton } from "./TodayCalendarButton";
import { NextWeekCalendarButton } from "./NextWeekButton";
import { NextWeekEndCalendarButton } from "./NextWeekEndButton";

interface Props {
  pickedDate: Date | null;
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
}

/* RENDER BUTTON TO OPEN POPOUT CALENDAR. INCLUDE THE POPOUT RENDER AND CALENDAR ICON. */
export const OpenCalendarPopOverButton: React.FC<Props> = ({
  pickedDate,
  setPickedDate,
}) => {
  const [tomorrowDay, setTomorrowDay] = useState(false);

  useEffect(() => {
    if (
      pickedDate?.toLocaleDateString() ===
      DateTime.local().plus({ day: 1 }).toLocaleString()
    ) {
      setTomorrowDay(true);
    } else setTomorrowDay(false);
  }, [pickedDate]);

  return (
    <>
      <Popover placement="right" autoFocus={false}>
        <PopoverTrigger>
          <Button>
            <BsCalendar4Event color="green" />
            <Text>{pickedDate?.toString().slice(4, 10)}</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          width="250px"
          height="541px"
          border="0px"
          boxShadow="dark-lg"
        >
          <PopoverHeader
            width="250px"
            height="42px"
            py="8px"
            paddingLeft="13px"
            paddingRight="10px"
            className="header"
          >
            <Text fontSize="13px" width="227px" height="26px" py="1px" px="2px">
              {pickedDate?.toString().slice(4, 10)}
            </Text>
          </PopoverHeader>
          <PopoverBody
            width="250px"
            height="170px"
            px="0px"
            py="4px"
            borderY="1px"
            borderColor="blackAlpha.200"
          >
            <Box width="250px" height="53.3px" display="flex">
              {tomorrowDay ? (
                <TodayCalendarButton setPickedDate={setPickedDate} />
              ) : (
                <TomorrowCalendarButton setPickedDate={setPickedDate} />
              )}
            </Box>
            <Box width="250px" height="53.3px" display="flex">
              <NextWeekEndCalendarButton setPickedDate={setPickedDate} />
            </Box>
            <Box width="250px" height="53.3px" display="flex">
              <NextWeekCalendarButton setPickedDate={setPickedDate} />
            </Box>
          </PopoverBody>
          <PopoverBody padding="0px" width="250px" height="288px">
            <Calendar
              onChange={setPickedDate}
              value={pickedDate}
              className="calendar"
            />
          </PopoverBody>
          <PopoverBody
            height="41px"
            py="8px"
            px="10px"
            borderTop="1px"
            borderColor="blackAlpha.200"
          >
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
