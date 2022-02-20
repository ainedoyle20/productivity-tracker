import CalendarActionTypes from "./calendar.types"

const INITIAL_STATE = {
    selectedDate: null,
    nav: 0,
    showTodoModal: false,
    days: [],
    dateDisplay: '',
}

const calendarReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
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
        case CalendarActionTypes.TOGGLE_SHOW_TODO_MODAL:
            return {
                ...state,
                showTodoModal: !state.showTodoModal
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
