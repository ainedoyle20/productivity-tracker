import React, {useEffect, useState} from "react";
import { connect } from "react-redux";

import { checkForTodosItem, getCalendarTodos, saveCalendarTodosToFirebase } from "../../firebase/firebase.utils";

import { toggleHidden } from '../../redux/calendar/calendar.actions';

import './calendarModal.styles.css';

const CalendarModal = ({ toggleHidden, currentUser, selectedDate, isPastDate }) => {
    const [calendarTodos, setCalendarTodos] = useState([]);
    const [calendarInput, setCalendarInput] = useState('');

    const runOnOpen = async () => {
        const todosAvailable = await checkForTodosItem(currentUser.id, selectedDate);
        console.log('checked for todosAvailable for ' + selectedDate);
        console.log('todosAvailable: ', todosAvailable);

        if (todosAvailable) {
            const firebaseTodos = await getCalendarTodos(currentUser.id, selectedDate);
            setCalendarTodos(firebaseTodos);
            console.log('setting calendar todos with firebase todos: ', firebaseTodos);
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

    console.log('isPastDate: ', isPastDate);
    return (
        <div className="calendar-modal">
            <input 
                className="calendar-input"
                placeholder="Create Todo"
                onChange={e => setCalendarInput(e.target.value)}
                value={calendarInput}
            />
            <button className="calendar-modal-create-button" disabled={isPastDate}
                onClick={() => {
                    console.log('calendarTodos: ', calendarTodos);
                    createCalendarTodo(calendarInput, calendarTodos);
                    setCalendarInput('');
                }}
            >Create</button>
            <ul className="display-todos-container">
                {
                    calendarTodos.length > 0 ? calendarTodos.map(obj => {
                        return <li key={obj.id}>{obj.description}</li>
                    }) : <span>No todos</span>
                }
            </ul>
            <button className="calendar-modal-button"
                onClick={() => {
                    toggleHidden();
                    if (calendarTodos.length && isPastDate !== true) {
                        console.log('saving scheduled todos to firebase');
                       saveCalendarTodosToFirebase(currentUser.id, selectedDate, calendarTodos); 
                    }
                    setCalendarTodos([]);
                }}
            >Close</button>
        </div>
    );
}

const mapStateToProps = ({ calendar, user }) => ({
    currentUser: user.currentUser,
    selectedDate: calendar.selectedDate,
    isPastDate: calendar.isPastDate,
});

const mapDispatchToProps = dispatch => ({
    toggleHidden: () => dispatch(toggleHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal);
