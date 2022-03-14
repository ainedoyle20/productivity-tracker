import React from "react";
import { connect } from "react-redux";

import CalendarDay from "../calendar-day/calendar-day.component";
import CalendarModal from '../calendarModal/calendarModal.component';

import { CalendarContainer } from './calendar.styles';

const Calendar = ({ days, hidden }) => {
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

const mapStateToProps = ({ calendar }) => ({
    days: calendar.days,
    hidden: calendar.hidden,
});

export default connect(mapStateToProps)(Calendar);
