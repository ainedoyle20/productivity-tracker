import React from "react";
import { connect } from "react-redux";

import { toggleHidden, selectDate, checkSelectedDate } from "../../redux/calendar/calendar.actions";

import './calendar-day.styles.css';

const CalendarDay = ({ day, toggleHidden, selectDate, checkSelectedDate }) => {
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;

    return (
        <div className={className} onClick={() => {
            if (day.date) {
              console.log('day.date is true: ', day.date);
              toggleHidden(); 
              selectDate(day.date);
              checkSelectedDate(day.date);
            }
          }}>
          {day.value === 'padding' ? '' : day.value}
    
          
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
  toggleHidden: () => dispatch(toggleHidden()),
  selectDate: (date) => dispatch(selectDate(date)),
  checkSelectedDate: (date) => dispatch(checkSelectedDate(date)),
});

export default connect(null, mapDispatchToProps)(CalendarDay);
