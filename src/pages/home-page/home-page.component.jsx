import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import { updateTodosForCurrentDay, updatePercentageValue } from '../../firebase/firebase.utils';

import Todo from '../../components/todo/todo.component';

import {createTodo, updatePercentage} from '../../redux/todos/todos.actions';

import './home-page.styles.css';

const HomePage = ({ todos, completedTodos, createTodo, currentUser, currentDate, todosChanged, percentageComplete, updatePercentage }) => {
    useEffect(() => {
        const currentUserId = currentUser ? currentUser.id : null;
        console.log('running useEffect outside');
        if (currentUserId) {
           updateTodosForCurrentDay(currentUserId, currentDate, todos, completedTodos); 
           console.log('running useEffect');
        }
        updatePercentage();
    }, [todosChanged, todos, completedTodos]);

    useEffect(() => {
        const currentUserId = currentUser ? currentUser.id : null;
        if (currentUserId) {
            updatePercentageValue(currentUserId, currentDate, percentageComplete);
        }
    }, [percentageComplete]);


    const [textInput, setTextInput] = useState('');

    console.log('todos: ', todos);
    console.log('completedTodos: ', completedTodos);
    console.log('percentageComplete: ', percentageComplete);
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
                        todos && todos.length ? (
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

const mapStateToProps = ({ user, calendar, todos }) => ({
    currentUser: user.currentUser,
    currentDate: calendar.currentDate,
    todos: todos.todos,
    completedTodos: todos.completedTodos,
    todosChanged: todos.todosChanged,
    percentageComplete: todos.percentageComplete,
});

const mapDispatchToProps = dispatch => ({
    createTodo: (textInput) => dispatch(createTodo(textInput)),
    updatePercentage: () => dispatch(updatePercentage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
