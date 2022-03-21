import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import { updateTodosForCurrentDay, updatePercentageValue } from '../../firebase/firebase.utils';

import Todo from '../../components/todo/todo.component';
import PlusIcon from '../../assets/plus-icon.svg';

import {createTodo, updatePercentage} from '../../redux/todos/todos.actions';

import {
    HomePageContainer,
    TodaysScheduleContainer,
    TodaysTodosHeader,
    CreateTodoContainer,
    CreateTodoInput,
    CreateTodaysTodoButton,
    TodaysTodosListContainer,
    TodosListTitleContainer,
    TodaysTodosList,
} from './home-page.styles';

const HomePage = ({ todos, completedTodos, createTodo, currentUser, currentDate, todosChanged, percentageComplete, updatePercentage }) => {
    const [textInput, setTextInput] = useState('');

    useEffect(() => {
        const currentUserId = currentUser ? currentUser.id : null;
        if (currentUserId) {
           updateTodosForCurrentDay(currentUserId, currentDate, todos, completedTodos); 
        }
        updatePercentage();
    }, [todosChanged, todos, completedTodos, currentDate, currentUser, updatePercentage]);

    useEffect(() => {
        const currentUserId = currentUser ? currentUser.id : null;
        if (currentUserId) {
            updatePercentageValue(currentUserId, currentDate, percentageComplete);
        }
    }, [percentageComplete, currentDate, currentUser]);
    
    return (
        <HomePageContainer>
            {
                currentUser 
                ? (
                    <TodaysScheduleContainer>
                        <TodaysTodosHeader>
                            <h1>Today's Schedule</h1>
                            <CreateTodoContainer>
                                <CreateTodoInput 
                                    type="text" 
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                />
                                <CreateTodaysTodoButton onClick={() =>{
                                    createTodo(textInput);
                                    setTextInput('');
                                }}>
                                    <img className="plus-icon" src={PlusIcon} alt="plus" />
                                </CreateTodaysTodoButton>
                            </CreateTodoContainer>
                        </TodaysTodosHeader>
                        
                        <TodaysTodosListContainer>
                            <TodosListTitleContainer>
                              <span>To Do</span>  
                            </TodosListTitleContainer>
                            <TodaysTodosList>
                                {
                                    todos && todos.length ? (
                                    todos.map(todo => {
                                        return <Todo key={todo.id} todo={todo} />
                                    }) 
                                    ) : (
                                        <div className="no-todos-span"><span>No Todos</span></div>
                                    )
                                }
                            </TodaysTodosList>
                        </TodaysTodosListContainer>
                        
                        <TodaysTodosListContainer>
                            <TodosListTitleContainer>
                                <span>Completed</span>
                            </TodosListTitleContainer>
                            <TodaysTodosList>
                                {
                                    completedTodos.length ? (
                                    completedTodos.map(todo => {
                                        return <Todo key={todo.id} todo={todo} />
                                    }) 
                                    ) : (
                                        <span> No Todos Completed Yet </span>
                                    )
                                }
                            </TodaysTodosList>
                        </TodaysTodosListContainer>
                    </TodaysScheduleContainer>
                ) : (
                    <h2>Login to see today's todos</h2>
                )
            }
        </HomePageContainer>
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
