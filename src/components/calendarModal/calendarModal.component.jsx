import React, {useEffect, useState} from "react";
import { connect } from "react-redux";

import { checkForTodosItem, getCalendarTodos, saveCalendarTodosToFirebase } from "../../firebase/firebase.utils";

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

const CalendarModal = ({ toggleHidden, currentUser, selectedDate, isPastDate }) => {
    const [calendarTodos, setCalendarTodos] = useState([]);
    const [calendarInput, setCalendarInput] = useState('');

    const runOnOpen = async () => {
        const todosAvailable = await checkForTodosItem(currentUser.id, selectedDate);

        if (todosAvailable) {
            const firebaseTodos = await getCalendarTodos(currentUser.id, selectedDate);
            setCalendarTodos(firebaseTodos);
        }
    }
    
    useEffect(() => {
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
        console.log('todoId: ', todoId);
        let todosArr = todosList.filter(todo => todo.id !== todoId);
        setCalendarTodos(todosArr);
    }

    console.log('calendarTodos: ', calendarTodos);
    return (
        <CalendarModalContainer>
            <CalendarModalHeader>
              <CalendarModalInput
                    placeholder="Create Todo"
                    onChange={e => setCalendarInput(e.target.value)}
                    value={calendarInput}
                /> 
                <CalendarModalCreateTodoButton disabled={isPastDate}
                    onClick={() => {
                        console.log('calendarTodos: ', calendarTodos);
                        createCalendarTodo(calendarInput, calendarTodos);
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
                        <img className="display-todo-icon" onClick={() => deleteCalendarTodo(obj.id, calendarTodos)} src={DeleteIcon} alt="delete"/>
                        </CalendarModalTodoContainer>)
                    }) : <span>No todos</span>
                }
            </CalendarModalTodosList>
            <CloseModalButtonContainer>
                <CloseModalButton
                    onClick={() => {
                        toggleHidden();
                        if (calendarTodos.length && isPastDate !== true) {
                        saveCalendarTodosToFirebase(currentUser.id, selectedDate, calendarTodos); 
                        }
                        setCalendarTodos([]);
                    }}
                >
                    Close
                </CloseModalButton>    
            </CloseModalButtonContainer>
        </CalendarModalContainer>
    );
};

const mapStateToProps = ({ calendar, user }) => ({
    currentUser: user.currentUser,
    selectedDate: calendar.selectedDate,
    isPastDate: calendar.isPastDate,
});

const mapDispatchToProps = dispatch => ({
    toggleHidden: () => dispatch(toggleHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal);
