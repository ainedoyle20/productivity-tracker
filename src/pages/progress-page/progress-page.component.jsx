import React, {useEffect, useState} from "react";
import { connect } from 'react-redux'

import { fetchDatesAndPercentages } from '../../firebase/firebase.utils';
import { setProgressDateDisplay, incrementProgressNav, decrementProgressNav } from '../../redux/progress/progress.actions';

import ProgressChart from "../../components/progress-chart/progress-chart.component";

import './progress-page.styles.css';

const ProgressPage = ({ currentDate, currentUser, progressNav, setProgressDateDisplay, progressDateDisplay, incrementProgressNav, decrementProgressNav }) => {
    const [dates, setDates] = useState([]);
    const [percentages, setPercentages] = useState([]);
    // const [className, setClassName] = useState('progress-page-no-data dates-full');

    useEffect(() => {
        const dt = new Date();
        const parsedDate = currentDate.split('-');
        let monthField = '';

        if (progressNav !== 0) {
            dt.setMonth(new Date().getMonth() + progressNav);
            monthField = `${dt.toLocaleDateString('en-gb', { month: 'numeric' })}-${parsedDate[2]}`;
        } else {
            monthField = `${parsedDate[1]}-${parsedDate[2]}`
        }

        const year = dt.getFullYear();
        setProgressDateDisplay(`${dt.toLocaleDateString('en-gb', { month: 'long' })} ${year}`);

        const currentUserId = currentUser ? currentUser.id : null;

        const runAsyncFunc = async () => {
            const { dates, percentages} = await fetchDatesAndPercentages(currentUserId, monthField);
            setDates(dates);
            setPercentages(percentages);
            // updateClassName(dates);
        }

        // const updateClassName = (dates) => {
        //     if (dates.length !== 0) {
        //         setClassName('progress-page-no-data dates-full')
        //     } else {
        //         setClassName('progress-page-no-data')
        //     }
        // }

        if (currentUserId) {
            runAsyncFunc();
        }

    }, [currentUser, progressNav]);

    return (
        <div className='progress-page'>
            <div className='progress-page-title-container'>
                <button className="progress-page-button" onClick={() => decrementProgressNav()}>Back</button>
                <h2>{progressDateDisplay}</h2>
                <button className="progress-page-button" onClick={() => incrementProgressNav()}>Forward</button>
            </div>
            {
                currentUser 
                ? <ProgressChart dates={dates}  percentages={percentages} /> 
                : <h2>Login to see your progress chart</h2>
            }
            <div className={`progress-page-no-data ${dates.length !== 0 ? 'dates-full' : ''}`}>
                <h2>No Data For This Month</h2>
            </div>
        </div>
    );
}

const mapStateToProps = ({ calendar, user, progress }) => ({
    currentDate: calendar.currentDate,
    currentUser: user.currentUser,
    progressNav: progress.progressNav,
    progressDateDisplay: progress.progressDateDisplay,
});

const mapDispatchToProps = dispatch => ({
    setProgressDateDisplay: (progressDateDisplay) => dispatch(setProgressDateDisplay(progressDateDisplay)),
    incrementProgressNav: () => dispatch(incrementProgressNav()),
    decrementProgressNav: () => dispatch(decrementProgressNav()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressPage);
