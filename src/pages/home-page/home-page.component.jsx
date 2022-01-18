import React, {useState} from 'react';
import { connect } from 'react-redux';

import Todo from '../../components/todo/todo.component';

import {createTodo} from '../../redux/todos/todos.actions';

import './home-page.styles.css';

const HomePage = ({ todos, completedTodos, createTodo }) => {
    // console.log('todos: ', todos);
    // console.log('completedTodos: ', completedTodos);

    const [textInput, setTextInput] = useState('');

    return (
        <div className='home_page'>
            <h1 className="home_page_title">Today's Schedule</h1>
            <div className="home_page_container">
                <div className="create_todo">
                    <input 
                        className="create-todo-input" 
                        type="text" 
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    /><button className="add-todo-button" onClick={() =>{
                        createTodo(textInput);
                        setTextInput('');
                        console.log('clicked')
                        }}>Add Todo</button>
                </div>


                <div className="home_page_todos_title_container">
                        <span>To Do</span>
                </div>
                
                <ul className="todos-list">
                    {
                        todos.length ? (
                        todos.map(todo => {
                            return <Todo key={todo.id} todo={todo} />
                        }) 
                        ) : (
                            <span> No Todos Created Yet </span>
                        )
                    }
                </ul>
                <div className="home_page_todos_title_container">
                        <span>Completed</span>
                </div>
                <ul className="todos-list">
                    {
                        completedTodos.length ? (
                        completedTodos.map(todo => {
                            return <Todo key={todo.id} todo={todo} />
                        }) 
                        ) : (
                            <span> No Todos Completed Yet </span>
                        )
                    }
                </ul>
            </div>
        </div>
    );  
}

const mapStateToProps = ({ todos }) => ({
    todos: todos.todos,
    completedTodos: todos.completedTodos
});

const mapDispatchToProps = dispatch => ({
    createTodo: (textInput) => dispatch(createTodo(textInput)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
