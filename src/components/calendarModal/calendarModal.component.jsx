import React, {useState} from "react";
import { connect } from "react-redux";

import { toggleHidden } from '../../redux/calendar/calendar.actions';

import './calendarModal.styles.css';

const CalendarModal = ({ toggleHidden }) => {
    const [calendarTodos, setCalendarTodos] = useState([]);
    const [calendarInput, setCalendarInput] = useState('');

    console.log(calendarInput);
    return (
        <div className="calendar-modal">
            <input 
                className="calendar-input"
                placeholder="Create Todo"
                onChange={e => setCalendarInput(e.target.value)}
                value={calendarInput}
            />
            <button className="calendar-modal-create-button"
                onClick={() => setCalendarInput('')}
            >Create</button>
            <div className="display-todos-container">
                No Todos
            </div>
            <button className="calendar-modal-button"
                onClick={() => {
                    console.log('close button clicked');
                    toggleHidden();
                }}
            >Close</button>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    toggleHidden: () => dispatch(toggleHidden()),
});

export default connect(null, mapDispatchToProps)(CalendarModal);
