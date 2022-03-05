import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { DateTime } from "luxon";

/* CALENDARMODAL BUTTONS IMPORTS */
import { TomorrowCalendarButton } from "./TomorrowCalendarButton";
import { TodayCalendarButton } from "./TodayCalendarButton";
import { NextWeekCalendarButton } from "./NextWeekButton";
import { NextWeekEndCalendarButton } from "./NextWeekEndButton";

interface CalendarProps {
  pickedDate: Date | null;
  setPickedDate: React.Dispatch<React.SetStateAction<Date>>;
  setCalendarText: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarProps> = ({
  pickedDate,
  setPickedDate,
  setCalendarText,
  isOpen,
  onClose,
}) => {
  /* STATES */
  const [tomorrowDay, setTomorrowDay] = useState(false);

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
            <Box width="250px" height="53.3px" display="flex" onClick={onClose}>
              {tomorrowDay ? (
                <TodayCalendarButton setPickedDate={setPickedDate} />
              ) : (
                <TomorrowCalendarButton setPickedDate={setPickedDate} />
              )}
            </Box>
            <Box width="250px" height="53.3px" display="flex" onClick={onClose}>
              <NextWeekEndCalendarButton setPickedDate={setPickedDate} />
            </Box>
            <Box width="250px" height="53.3px" display="flex" onClick={onClose}>
              <NextWeekCalendarButton setPickedDate={setPickedDate} />
            </Box>
          </ModalBody>
          <ModalBody
            padding="0px"
            width="250px"
            height="288px"
            onClick={onClose}
          >
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
