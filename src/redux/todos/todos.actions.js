import TodosActionTypes from './todos.types';

export const createTodo = todo => ({
    type: TodosActionTypes.CREATE_TODO,
    payload: todo,
});

export const completeTodo = todo => ({
    type: TodosActionTypes.COMPLETE_TODO,
    payload: todo
});

export const deleteTodo = todo => ({
    type: TodosActionTypes.DELETE_TODO,
    payload: todo
});

export const editTodo = (todoIdAndDescription) => ({
    type: TodosActionTypes.EDIT_TODO,
    payload: todoIdAndDescription
});

export const updateTodos = (todos) => ({
    type: TodosActionTypes.UPDATE_TODOS,
    payload: todos
});

