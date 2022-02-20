import React from "react";
import { connect } from "react-redux";

import CalendarDay from "../calendar-day/calendar-day.component";

import './calendar.styles.css';

const Calendar = ({ days }) => {
    return (
        <div id="calendar">
            {days.map((d, index) => (
                <CalendarDay
                    key={index}
                    day={d}
                />
            ))}
        </div>
        
    );
}

const mapStateToProps = ({ calendar }) => ({
    days: calendar.days
});

export default connect(mapStateToProps)(Calendar);
