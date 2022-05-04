import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateTodosForCurrentDay, updatePercentageValue } from '../../firebase/firebase.utils';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCurrentDate } from '../../redux/calendar/calendar.selectors';
import { selectCompletedTodos, selectIncompleteTodos, selectTodosChanged, selectPercentageCompleted } from '../../redux/todos/todos.selectors';

import {createTodo, updatePercentage} from '../../redux/todos/todos.actions';

import Todo from '../../components/todo/todo.component';
import PlusIcon from '../../assets/plus-icon.svg';

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

const HomePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const currentDate = useSelector(selectCurrentDate);
    const todos = useSelector(selectIncompleteTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    const todosChanged = useSelector(selectTodosChanged);
    const percentageComplete = useSelector(selectPercentageCompleted);

    const [textInput, setTextInput] = useState('');

    useEffect(() => {
        const currentUserId = currentUser ? currentUser.id : null;
        if (currentUserId) {
           updateTodosForCurrentDay(currentUserId, currentDate, todos, completedTodos); 
        }
        dispatch(updatePercentage());
    }, [todosChanged, todos, completedTodos]);

    useEffect(() => {
        const currentUserId = currentUser ? currentUser.id : null;
        if (currentUserId) {
            updatePercentageValue(currentUserId, currentDate, percentageComplete);
        }
    }, [percentageComplete]);
    
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
                                    dispatch(createTodo(textInput));
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

export default HomePage;
