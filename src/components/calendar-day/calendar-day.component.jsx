import React from "react";

import './calendar-day.styles.css';

const CalendarDay = ({ day }) => {
    const className = `day ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;

    return (
        <div className={className}>
          {day.value === 'padding' ? '' : day.value}
    
          
        </div>
    );
}

export default CalendarDay;
