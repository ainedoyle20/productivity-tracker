import TodosActionTypes from './todos.types';

import { removeCompletedTodo, addCompletedTodo, createTodoHelper, editTodoHelper } from './todos.utils';

const INITIAL_STATE = {
    todos: [
        {
            id: 1,
            description: 'Some todo 1'
        }
    ],
    completedTodos: [],
}

const todosReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case TodosActionTypes.COMPLETE_TODO: 
            return {
                ...state,
                todos: removeCompletedTodo(state.todos, action.payload),
                completedTodos: addCompletedTodo(state.completedTodos, action.payload),
            }
        case TodosActionTypes.CREATE_TODO:
            return {
                ...state,
                todos: createTodoHelper(state.todos, state.completedTodos, action.payload),
            }
        case TodosActionTypes.DELETE_TODO:
            return {
                ...state,
                todos: removeCompletedTodo(state.todos, action.payload),
                completedTodos: removeCompletedTodo(state.completedTodos, action.payload)
            }
        case TodosActionTypes.EDIT_TODO:
            return {
                ...state,
                todos: editTodoHelper(state.todos, action.payload)
            }
        default: 
            return state;
    }
}

export default todosReducer;