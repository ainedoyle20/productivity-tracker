import TodosActionTypes from './todos.types';

import { completeTodoHelper, createTodoHelper, editTodoHelper } from './todos.utils';

const INITIAL_STATE = {
    todos: [],
}

const todosReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {

        case TodosActionTypes.UPDATE_TODOS:
            return {
                ...state,
                todos: action.payload
            }

        case TodosActionTypes.COMPLETE_TODO: 
            return {
                ...state,
                todos: completeTodoHelper(state.todos, action.payload),
            }

        case TodosActionTypes.CREATE_TODO:
            return {
                ...state,
                todos: createTodoHelper(state.todos, action.payload),
            }

        case TodosActionTypes.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(obj => obj.id !== action.payload.id),
            }

        case TodosActionTypes.EDIT_TODO:
            return {
                ...state,
                todos: editTodoHelper(state.todos, action.payload),
            }

        default: 
            return state;

    }
}

export default todosReducer;
