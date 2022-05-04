import React from "react";
import { useSelector } from "react-redux";

import { selectDays, selectHiddenValue } from '../../redux/calendar/calendar.selectors';

import CalendarDay from "../calendar-day/calendar-day.component";
import CalendarModal from '../calendarModal/calendarModal.component';

import { CalendarContainer } from './calendar.styles';

const Calendar = () => {
    const days = useSelector(selectDays);
    const hidden = useSelector(selectHiddenValue);

    return (
        <CalendarContainer>
            {days.map((d, index) => (
                <CalendarDay
                    key={index}
                    day={d}
                />
            ))}
                {
                    hidden ? null : <CalendarModal />
                }
        </CalendarContainer>
        
    );
}

export default Calendar;
