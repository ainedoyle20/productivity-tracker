import CalendarActionTypes from "./calendar.types";

export const selectDate = (date) => ({
    type: CalendarActionTypes.SELECT_DATE,
    payload: date,
});

export const increaseNav = () => ({
    type: CalendarActionTypes.INCREASE_NAV,
});

export const decreaseNav = () => ({
    type: CalendarActionTypes.DECREASE_NAV,
});

export const toggleShowTodoModal = () => ({
    type: CalendarActionTypes.TOGGLE_SHOW_TODO_MODAL,
});

export const setDays = (daysArr) => ({
    type: CalendarActionTypes.SET_DAYS,
    payload: daysArr,
});

export const setDateDisplay = (dateDisplay) => ({
    type: CalendarActionTypes.SET_DATE_DISPLAY,
    payload: dateDisplay,
});
