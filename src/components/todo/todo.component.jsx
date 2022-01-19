import React, {useState} from 'react';
import { connect } from 'react-redux';

import { completeTodo, deleteTodo, editTodo } from '../../redux/todos/todos.actions';

import TodoEditForm from '../todoEditForm/todoEditForm.component';

import './todo.styles.css';

const Todo = ({ todo, completeTodo, deleteTodo, editTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const submitEdit = editDescription => {
        editTodo(edit.id, editDescription);
        setEdit({
            id: null,
            value: ''
        });
    };

    if (edit.id) {
        return <TodoEditForm edit={edit} submitEdit={submitEdit}/>
    }

    const { description } = todo;
    return (
        <>
           <li className="todo-container">
                <p className="todo-description">{description}</p>
                <div className="icon-container">
                    <span className="todo-icon" onClick={() => completeTodo(todo)}>
                        done
                    </span> 
                    <span className="todo-icon" onClick={() => setEdit({ id: todo.id, value: description })}>
                        edit
                    </span> 
                    <span className="todo-icon" onClick={() => deleteTodo(todo)}>
                        delete
                    </span>  
                </div>
                
            </li> 
        </>
            
    );
}

const mapDispatchToProps = dispatch => ({
    completeTodo: (todo) => dispatch(completeTodo(todo)),
    deleteTodo: (todo) => dispatch(deleteTodo(todo)),
    editTodo: (todoId, todoDescription) => dispatch(editTodo({ todoId, todoDescription})),
});

export default connect(null, mapDispatchToProps)(Todo);