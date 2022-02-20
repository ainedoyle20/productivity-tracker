import React from "react";
import { connect } from "react-redux";

import { increaseNav, decreaseNav } from "../../redux/calendar/calendar.actions";

import './calendarHeader.styles.css';

const CalendarHeader = ({ dateDisplay, increaseNav, decreaseNav }) => {
    return (
        <div id="header">
            <div>{dateDisplay}</div>
            <div>
                <button id="backButton" onClick={() => decreaseNav()}>Back</button>
                <button id="nextButton" onClick={() => increaseNav()}>Next</button>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    increaseNav: () => dispatch(increaseNav()),
    decreaseNav: () => dispatch(decreaseNav()),
});

export default connect(null, mapDispatchToProps)(CalendarHeader);
