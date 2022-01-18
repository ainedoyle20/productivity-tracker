import React from 'react';
import { connect } from 'react-redux';

import { completeTodo, deleteTodo } from '../../redux/todos/todos.actions';

import './todo.styles.css';

const Todo = ({ todo, completeTodo, deleteTodo }) => {
    const { description } = todo;
    return (
        <>
           <li className="todo-container">
                <p className="todo-description">{description}</p>
                <div className="icon-container">
                    <span className="todo-icon" onClick={() => completeTodo(todo)}>
                        done
                    </span> 
                    <span className="todo-icon" onClick={() => completeTodo(todo)}>
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
});

export default connect(null, mapDispatchToProps)(Todo);