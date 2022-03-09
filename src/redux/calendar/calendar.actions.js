import CalendarActionTypes from "./calendar.types";

export const selectDate = (date) => ({
    type: CalendarActionTypes.SELECT_DATE,
    payload: date,
});

export const checkSelectedDate = (date) => ({
    type: CalendarActionTypes.CHECK_SELECTED_DATE,
    payload: date,
});

export const increaseNav = () => ({
    type: CalendarActionTypes.INCREASE_NAV,
});

export const decreaseNav = () => ({
    type: CalendarActionTypes.DECREASE_NAV,
});

export const toggleHidden = () => ({
    type: CalendarActionTypes.TOGGLE_HIDDEN,
});

export const setDays = (daysArr) => ({
    type: CalendarActionTypes.SET_DAYS,
    payload: daysArr,
});

export const setDateDisplay = (dateDisplay) => ({
    type: CalendarActionTypes.SET_DATE_DISPLAY,
    payload: dateDisplay,
});

export const setCurrentDate = (currentDate) => ({
    type: CalendarActionTypes.SET_CURRENT_DATE,
    payload: currentDate,
});
