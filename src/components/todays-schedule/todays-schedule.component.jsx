import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateTodosForCurrentDay, updatePercentageValue } from '../../firebase/firebase.utils';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCurrentDate } from '../../redux/calendar/calendar.selectors';
import { selectPercentageCompleted, selectIncompleteTodos, selectCompletedTodos } from '../../redux/todos/todos.selectors';

import { createTodo } from '../../redux/todos/todos.actions';

import Todo from '../../components/todo/todo.component';
import PlusIcon from '../../assets/plus-icon.svg';

import {
    TodaysScheduleContainer,
    TodaysTodosHeader,
    CreateTodoContainer,
    CreateTodoInput,
    CreateTodaysTodoButton,
    TodaysTodosListContainer,
    TodosListTitleContainer,
    TodaysTodosList,
    HorizontalLine,
} from './todays-schedule.styles';

const TodaysSchedule = () => {
    const dispatch = useDispatch();
    
    const currentUser = useSelector(selectCurrentUser);
    const currentDate = useSelector(selectCurrentDate);
    const todos = useSelector(selectIncompleteTodos);
    const completedTodos = useSelector(selectCompletedTodos);
    const percentageComplete = useSelector(selectPercentageCompleted);

    const [textInput, setTextInput] = useState('');

    useEffect(() => {
        if (currentUser && currentDate) {
            updatePercentageValue(currentUser.id, currentDate, percentageComplete);
        }

    }, [percentageComplete]);

    const updateFirebase = async () => {
        if (!currentUser || !currentDate) {
            return;
        }

        try {
            await updateTodosForCurrentDay(currentUser.id, currentDate, [...todos, ...completedTodos]);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    useEffect(() => {

        updateFirebase();

    }, [todos, completedTodos]);

    const createTodoHandler = async () => {
        try {
            dispatch(createTodo(textInput));
            setTextInput('');
        } catch (error) {
            alert('Sorry, there was an error creating your todo. Please try again later');
        }
    }

    return (
        <TodaysScheduleContainer>

            <TodaysTodosHeader>
                <h1>Today's Schedule</h1>
                <CreateTodoContainer>
                    <CreateTodoInput 
                        type="text" 
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    <CreateTodaysTodoButton onClick={createTodoHandler}>
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
                        todos.length ? (
                        todos.map(todo => {
                            // if (!todo.complete) {
                            //     return <Todo key={todo.id} todo={todo} />
                            // }
                            // return null;
                            return <Todo key={todo.id} todo={todo} />
                        }) 
                        ) : (
                            null
                        )
                    }
                </TodaysTodosList>
            </TodaysTodosListContainer>

            <HorizontalLine />
            
            <TodaysTodosListContainer>
                <TodosListTitleContainer>
                    <span>Completed</span>
                </TodosListTitleContainer>
                <TodaysTodosList>
                    {
                        completedTodos.length ? (
                        completedTodos.map(todo => {
                            // if (todo.complete) {
                            //     return <Todo key={todo.id} todo={todo} />
                            // }

                            // return null;

                            return <Todo key={todo.id} todo={todo} />
                        }) 
                        ) : (
                            null
                        )
                    }
                </TodaysTodosList>
            </TodaysTodosListContainer>

        </TodaysScheduleContainer>      
    );  
}

export default TodaysSchedule;
