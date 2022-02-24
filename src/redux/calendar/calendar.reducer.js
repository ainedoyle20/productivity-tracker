import CalendarActionTypes from "./calendar.types"

const INITIAL_STATE = {
    hidden: true,
    selectedDate: null,
    nav: 0,
    days: [],
    dateDisplay: '',
    currentDate: '',
}

const calendarReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case CalendarActionTypes.SET_CURRENT_DATE:
            return {
                ...state,
                currentDate: action.payload
            }
        case CalendarActionTypes.SET_DAYS:
            return {
                ...state,
                days: action.payload,
            }
        case CalendarActionTypes.SELECT_DATE:
            return {
                ...state,
                selectedDate: action.payload
            }
        case CalendarActionTypes.SET_DATE_DISPLAY:
            return {
                ...state,
                dateDisplay: action.payload
            }
        case CalendarActionTypes.TOGGLE_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CalendarActionTypes.INCREASE_NAV:
            return {
                ...state,
                nav: state.nav + 1
            }
        case CalendarActionTypes.DECREASE_NAV:
            return {
                ...state,
                nav: state.nav - 1
            }
        default:
            return state;
    }
}

export default calendarReducer;
