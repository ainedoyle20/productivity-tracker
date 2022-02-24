import React from "react";
import { connect } from "react-redux";

import { toggleHidden } from "../../redux/calendar/calendar.actions";

import './calendar-day.styles.css';

const CalendarDay = ({ day, toggleHidden }) => {
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;

    return (
        <div className={className} onClick={() => {toggleHidden(); console.log('day date: ', day.date)}}>
          {day.value === 'padding' ? '' : day.value}
    
          
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
  toggleHidden: () => dispatch(toggleHidden()),
});

export default connect(null, mapDispatchToProps)(CalendarDay);
