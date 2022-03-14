import React from "react";
import { connect } from "react-redux";

import { increaseNav, decreaseNav } from "../../redux/calendar/calendar.actions";

import {
    CalendarHeaderContainer,
    CalendarHeaderButton
} from './calendar-header.styles';

const CalendarHeader = ({ dateDisplay, increaseNav, decreaseNav }) => {
    return (
        <CalendarHeaderContainer>
            <div>{dateDisplay}</div>
            <div>
                <CalendarHeaderButton onClick={() => decreaseNav()}>Back</CalendarHeaderButton>
                <CalendarHeaderButton onClick={() => increaseNav()}>Next</CalendarHeaderButton>
            </div>
        </CalendarHeaderContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    increaseNav: () => dispatch(increaseNav()),
    decreaseNav: () => dispatch(decreaseNav()),
});

export default connect(null, mapDispatchToProps)(CalendarHeader);
