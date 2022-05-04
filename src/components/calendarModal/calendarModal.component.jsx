import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkForTodosItem, getCalendarTodos, saveCalendarTodosToFirebase } from "../../firebase/firebase.utils";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectIsPastDate, selectSelectedDate } from "../../redux/calendar/calendar.selectors";

import { toggleHidden } from '../../redux/calendar/calendar.actions';

import PlusIcon from '../../assets/plus-icon.svg';
import DeleteIcon from '../../assets/delete-icon.svg';

import {
    CalendarModalContainer,
    CalendarModalHeader,
    CalendarModalInput,
    CalendarModalCreateTodoButton,
    CalendarModalTodosList,
    CalendarModalTodoContainer,
    CloseModalButtonContainer,
    CloseModalButton,
} from './calendar-modal.styles';


const CalendarModal = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const selectedDate = useSelector(selectSelectedDate);
    const isPastDate = useSelector(selectIsPastDate);

    const [calendarTodos, setCalendarTodos] = useState([]);
    const [calendarInput, setCalendarInput] = useState('');
    
    useEffect(() => {
        const runOnOpen = async () => {
            const todosAvailable = await checkForTodosItem(currentUser.id, selectedDate);
    
            if (todosAvailable) {
                const firebaseTodos = await getCalendarTodos(currentUser.id, selectedDate);
                setCalendarTodos(firebaseTodos);
            }  
        }

        runOnOpen();
    }, []);

    const findLargestId = (todosList) => {
        let largestId = 0;
        if (todosList.length > 0) {
            todosList.forEach(obj => {
                if (obj.id > largestId) {
                    largestId = obj.id;
                }
            })
        }
    
        return largestId;
    }

    const createCalendarTodo = (todoDescription, todosList) => {
        const todoId = findLargestId(todosList) + 1;
        const newTodo = {'id': todoId, 'description': todoDescription};
        todosList.push(newTodo);
        setCalendarTodos(todosList);
    }

    const deleteCalendarTodo = (todoId, todosList) => {
        let todosArr = todosList.filter(todo => todo.id !== todoId);
        setCalendarTodos(todosArr);
    }

    const closeModal = async () => {
        if (calendarTodos.length && isPastDate !== true) {
            await saveCalendarTodosToFirebase(currentUser.id, selectedDate, calendarTodos); 
        }
        setCalendarTodos([]);
        dispatch(toggleHidden());
    }

    return (
        <CalendarModalContainer>
            <CalendarModalHeader>
              <CalendarModalInput
                    placeholder="Create Todo"
                    onChange={e => setCalendarInput(e.target.value)}
                    value={calendarInput}
                /> 
                <CalendarModalCreateTodoButton
                    onClick={() => {
                        if (isPastDate !== true) {
                            createCalendarTodo(calendarInput, calendarTodos);  
                        } else {
                            alert('Sorry, past todos cannot be scheduled or altered.');
                        }
                        setCalendarInput('');
                    }}
                >
                    <img src={PlusIcon} alt="plus"/>
                </CalendarModalCreateTodoButton> 
            </CalendarModalHeader>
            
            
            <CalendarModalTodosList>
                {
                    calendarTodos.length > 0 ? calendarTodos.map(obj => {
                        return (<CalendarModalTodoContainer key={obj.id}>
                        <li key={obj.id}>{obj.description}</li>
                        <img className="display-todo-icon" onClick={() => {
                            if (isPastDate !== true) {
                               deleteCalendarTodo(obj.id, calendarTodos); 
                            } else {
                                alert('Sorry, past todos cannot be scheduled or altered.');
                            }
                        }} src={DeleteIcon} alt="delete"/>
                        </CalendarModalTodoContainer>)
                    }) : <span>No todos</span>
                }
            </CalendarModalTodosList>
            <CloseModalButtonContainer>
                <CloseModalButton
                    onClick={() => {
                        closeModal();
                    }}
                >
                    Close
                </CloseModalButton>    
            </CloseModalButtonContainer>
        </CalendarModalContainer>
    );
};

export default CalendarModal;
