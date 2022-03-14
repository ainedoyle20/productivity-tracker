import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

import { toggleHidden, selectDate, checkSelectedDate } from "../../redux/calendar/calendar.actions";

import { CalendarDayContainer } from './calendar-day.styles';

const CalendarDay = ({ day, toggleHidden, selectDate, checkSelectedDate, currentDate }) => {
    const navigate = useNavigate();
    const redirectToHome = () => {
      navigate('/main/home');
    }

    return (
        <CalendarDayContainer padding={day.value === 'padding' ? true : false} isCurrentDay={day.isCurrentDay} onClick={() => {
            if (day.date) {
              if (day.date === currentDate) {
                console.log('this is the currentDate!');
                redirectToHome();
              } else {
                toggleHidden(); 
                selectDate(day.date);
                checkSelectedDate(day.date);
              }
            }
          }}>
          {day.value === 'padding' ? '' : day.value}
    
          
        </CalendarDayContainer>
    );
};

const mapStateToProps = ({ calendar }) => ({
  currentDate: calendar.currentDate,
});

const mapDispatchToProps = dispatch => ({
  toggleHidden: () => dispatch(toggleHidden()),
  selectDate: (date) => dispatch(selectDate(date)),
  checkSelectedDate: (date) => dispatch(checkSelectedDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDay);
