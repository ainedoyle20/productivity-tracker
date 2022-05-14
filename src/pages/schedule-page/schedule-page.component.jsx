import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCalendarNav, selectCalendarDateDisplay } from "../../redux/calendar/calendar.selectors";

import {setDateDisplay, setDays} from '../../redux/calendar/calendar.actions';

import CalendarHeader from "../../components/calendarHeader/calendarHeader.component";
import Calendar from "../../components/calendar/calendar.component";

import {
    CalendarPlatform,
    WeekdaysContainer
} from './schedule-page.styles';

const SchedulePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const nav = useSelector(selectCalendarNav);
    const dateDisplay = useSelector(selectCalendarDateDisplay);

    useEffect(() => {
        if (!currentUser) return;

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

        dispatch(setDateDisplay(`${dt.toLocaleDateString('en-gb', { month: 'long' })} ${year}`));

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
      
        dispatch(setDays(daysArr));
    }, [nav]);

    if (!currentUser) {
        return (<h2 style={{ margin: 'auto', marginTop: '40vh', width: '40vw' }}>Please login to schedule tasks</h2>)
    }

    return (
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
    );
}

export default SchedulePage;
