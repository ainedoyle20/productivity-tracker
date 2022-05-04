import { createSelector } from "reselect";

const selectCalendarReducer = state => state.calendar;

export const selectDays = createSelector(
    [selectCalendarReducer],
    (calendarSlice) => calendarSlice.days
);

export const selectHiddenValue = createSelector(
    [selectCalendarReducer],
    (calendarSlice) => calendarSlice.hidden
);

export const selectCurrentDate = createSelector(
    [selectCalendarReducer],
    (calendarSlice) => calendarSlice.currentDate
);

export const selectSelectedDate = createSelector(
    [selectCalendarReducer],
    (calendarSlice) => calendarSlice.selectedDate
);

export const selectIsPastDate = createSelector(
    [selectCalendarReducer],
    (calendarSlice) => calendarSlice.isPastDate
);

export const selectCalendarNav = createSelector(
    [selectCalendarReducer],
    (calendarSlice) => calendarSlice.nav
);

export const selectCalendarDateDisplay = createSelector(
    [selectCalendarReducer],
    (calendarSlice) => calendarSlice.dateDisplay
);
