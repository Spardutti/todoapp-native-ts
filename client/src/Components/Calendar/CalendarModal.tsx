import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect, ReactElement } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { DateTime } from "luxon";
import { BsCalendar4Event } from "react-icons/bs";

/* CALENDARMODAL BUTTONS IMPORTS */
import { TomorrowCalendarButton } from "./TomorrowCalendarButton";
import { TodayCalendarButton } from "./TodayCalendarButton";
import { NextWeekCalendarButton } from "./NextWeekButton";
import { NextWeekEndCalendarButton } from "./NextWeekEndButton";

interface CalendarProps {
  pickedDate: Date | null;
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
  dayText: ReactElement<"div">;
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarProps> = ({
  pickedDate,
  setPickedDate,
  dayText,
  isOpen,
  onClose,
}) => {
  /* STATES */
  const [tomorrowDay, setTomorrowDay] = useState(false);
  const [calendarText, setCalendarText] = useState(1);

  /* SWITCH TODAY/TOMORROW PICK BUTTON INFO DEPENDING ON THE PICKED DATE */
  useEffect(() => {
    if (
      pickedDate?.toLocaleDateString() ===
      DateTime.local().plus({ day: 1 }).toLocaleString()
    ) {
      setTomorrowDay(true);
    } else setTomorrowDay(false);
  }, [pickedDate]);

  /* COMPARES USER PICKED DATE TO "TODAY/TOMORROW/ELSE DAYS TO SET THE CALENDARTEXT CORRECT INFO" */
  useEffect(() => {
    if (
      pickedDate?.toLocaleDateString() === DateTime.local().toLocaleString()
    ) {
      setCalendarText(1);
    } else if (
      pickedDate?.toLocaleDateString() ===
      DateTime.local().plus({ day: 1 }).toLocaleString()
    ) {
      setCalendarText(2);
    } else setCalendarText(0);
  }, [pickedDate]);

  /* DISPLAY THE CORRECT DAY TEXT DEPENDING ON THE CALENDAR TEXT INFO */
  if (calendarText === 1) {
    dayText = (
      <Box display="flex" justifyContent="space-between">
        <BsCalendar4Event color="green" />
        <Text ml="5px" fontSize="13px" textColor="green">
          Today
        </Text>
      </Box>
    );
  } else if (calendarText === 2) {
    dayText = (
      <Box display="flex" justifyContent="space-between">
        <BsCalendar4Event color="#ad6200" />
        <Text ml="5px" fontSize="13px" textColor="#ad6200">
          Tomorrow
        </Text>
      </Box>
    );
  } else {
    dayText = (
      <Box display="flex" justifyContent="space-between">
        <BsCalendar4Event color="grey" />
        <Text ml="5px" fontSize="13px" textColor="grey">
          {pickedDate?.toString().slice(4, 10)}
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          width="250px"
          height="541px"
          border="0px"
          boxShadow="dark-lg"
        >
          <ModalHeader
            width="250px"
            height="42px"
            py="8px"
            paddingLeft="13px"
            paddingRight="10px"
            className="header"
          >
            <Text
              fontSize="13px"
              width="227px"
              height="26px"
              py="1px"
              px="2px"
              fontFamily="sans-serif"
            >
              {" "}
              {pickedDate?.toString().slice(4, 10)}{" "}
            </Text>
          </ModalHeader>
          <ModalBody
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
          </ModalBody>
          <ModalBody padding="0px" width="250px" height="288px">
            <Calendar
              onChange={setPickedDate}
              value={pickedDate}
              className="calendar"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
