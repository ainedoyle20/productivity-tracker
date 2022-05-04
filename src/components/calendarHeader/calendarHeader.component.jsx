import React from "react";
import { useDispatch } from "react-redux";

import { increaseNav, decreaseNav } from "../../redux/calendar/calendar.actions";

import {
    CalendarHeaderContainer,
    CalendarHeaderButton
} from './calendar-header.styles';

const CalendarHeader = ({ dateDisplay }) => {
    const dispatch = useDispatch();

    return (
        <CalendarHeaderContainer>
            <div>{dateDisplay}</div>
            <div>
                <CalendarHeaderButton onClick={() => dispatch(decreaseNav())}>Back</CalendarHeaderButton>
                <CalendarHeaderButton onClick={() => dispatch(increaseNav())}>Next</CalendarHeaderButton>
            </div>
        </CalendarHeaderContainer>
    );
}

export default CalendarHeader;
