import { createSelector } from "reselect";

const selectTodosReducer = state => state.todos;

export const selectIncompleteTodos = createSelector(
    [selectTodosReducer],
    (todosSlice) => todosSlice.todos
);

export const selectCompletedTodos = createSelector(
    [selectTodosReducer],
    (todosSlice) => todosSlice.completedTodos
);

export const selectTodosChanged = createSelector(
    [selectTodosReducer],
    (todosSlice) => todosSlice.todosChanged
);

export const selectPercentageCompleted = createSelector(
    [selectTodosReducer],
    (todosSlice) => todosSlice.percentageComplete
);
