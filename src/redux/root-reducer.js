import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import todosReducer from "./todos/todos.reducer";
import calendarReducer from "./calendar/calendar.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    todos: todosReducer,
    calendar: calendarReducer,
});

export default rootReducer;
