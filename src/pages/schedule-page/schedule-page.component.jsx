import React, {useEffect} from "react";
import { connect } from "react-redux";

import {setDateDisplay, setDays} from '../../redux/calendar/calendar.actions';

import CalendarHeader from "../../components/calendarHeader/calendarHeader.component";
import Calendar from "../../components/calendar/calendar.component";

import {
    SchedulePageContainer,
    CalendarPlatform,
    WeekdaysContainer
} from './schedule-page.styles';

const SchedulePage = ({ dateDisplay, nav, setDateDisplay, setDays, currentUser }) => {

    useEffect(() => {
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        } 

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const dateString = firstDayOfMonth.toLocaleDateString('en-gb', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        setDateDisplay(`${dt.toLocaleDateString('en-gb', { month: 'long' })} ${year}`);

        const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

        const daysArr = [];

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const dayString = `${i - paddingDays}-${month + 1}-${year}`;
      
            if (i > paddingDays) {
              daysArr.push({
                value: i - paddingDays,
                event: 'some event',
                isCurrentDay: i - paddingDays === day && nav === 0,
                date: dayString,
              });
            } else {
              daysArr.push({
                value: 'padding',
                event: null,
                isCurrentDay: false,
                date: '',
              });
            }
        }
      
        setDays(daysArr);
    }, [nav]);

    return (
        
        <SchedulePageContainer>
            {
                currentUser 
                ? (
                    <CalendarPlatform>
                        <CalendarHeader 
                            dateDisplay={dateDisplay}
                        />

                        <WeekdaysContainer>
                            <div>Monday</div>
                            <div>Tuesday</div>
                            <div>Wednesday</div>
                            <div>Thursday</div>
                            <div>Friday</div>
                            <div>Saturday</div>
                            <div>Sunday</div>
                        </WeekdaysContainer>

                        <Calendar />

                    </CalendarPlatform>
                )
                :   
                    <h2>Login to schedule future todos.</h2>
            }
        </SchedulePageContainer>
    );
}

const mapStateToProps = ({ calendar, user }) => ({
    nav: calendar.nav,
    dateDisplay: calendar.dateDisplay,
    currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    setDateDisplay: (date) => dispatch(setDateDisplay(date)),
    setDays: (daysArr) => dispatch(setDays(daysArr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);
