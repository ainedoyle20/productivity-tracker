import { createSelector } from "reselect";

const selectTodosReducer = state => state.todos;

export const selectTodosList = createSelector(
    [selectTodosReducer],
    (todosSlice) => todosSlice.todos
);

export const selectIncompleteTodos = createSelector(
    [selectTodosList],
    (todosList) => todosList.filter(obj => obj.complete !== true)
);

export const selectCompletedTodos = createSelector(
    [selectTodosList],
    (todosList) => todosList.filter(obj => obj.complete === true)
);

export const selectPercentageCompleted = createSelector(
    [selectIncompleteTodos, selectCompletedTodos],
    (todos, completedTodos) => {

        if (completedTodos.length === 0) return 0;

        const totalTodos = todos.length + completedTodos.length;
        const percentage = Math.floor((completedTodos.length / totalTodos) * 100);

        return percentage;
    }
);
