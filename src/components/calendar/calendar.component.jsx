import React from "react";
import { connect } from "react-redux";

import CalendarDay from "../calendar-day/calendar-day.component";
import CalendarModal from '../calendarModal/calendarModal.component';

import './calendar.styles.css';

const Calendar = ({ days, hidden }) => {
    return (
        <div id="calendar">
            {days.map((d, index) => (
                <CalendarDay
                    key={index}
                    day={d}
                />
            ))}
                {
                    hidden ? null : <CalendarModal />
                }
        </div>
        
    );
}

const mapStateToProps = ({ calendar }) => ({
    days: calendar.days,
    hidden: calendar.hidden,
});

export default connect(mapStateToProps)(Calendar);
