import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import todosReducer from "./todos/todos.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    todos: todosReducer
});

export default rootReducer;
