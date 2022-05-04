import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { selectCurrentDate } from "../../redux/calendar/calendar.selectors";
import { toggleHidden, selectDate, checkSelectedDate } from "../../redux/calendar/calendar.actions";

import { CalendarDayContainer } from './calendar-day.styles';

const CalendarDay = ({ day }) => {
    const navigate = useNavigate();
    const redirectToHome = () => {
      navigate('/main/home');
    }

    const dispatch = useDispatch();
    const currentDate = useSelector(selectCurrentDate);

    return (
        <CalendarDayContainer padding={day.value === 'padding' ? true : false} isCurrentDay={day.isCurrentDay} onClick={() => {
            if (day.date) {
              if (day.date === currentDate) {
                console.log('this is the currentDate!');
                redirectToHome();
              } else {
                dispatch(toggleHidden()); 
                dispatch(selectDate(day.date));
                dispatch(checkSelectedDate(day.date));
              }
            }
          }}>
          {day.value === 'padding' ? '' : day.value}
    
          
        </CalendarDayContainer>
    );
};

export default CalendarDay;
