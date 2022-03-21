import React, {useEffect, useState} from "react";
import { connect } from 'react-redux'

import { fetchDatesAndPercentages } from '../../firebase/firebase.utils';
import { setProgressDateDisplay, incrementProgressNav, decrementProgressNav } from '../../redux/progress/progress.actions';

import ProgressChart from "../../components/progress-chart/progress-chart.component";

import {
    ProgressPageContainer,
    ProgressPageTitleContainer,
    ProgressPageButton,
    NoChartDataMessageContainer,
} from './progress-page.styles';

const ProgressPage = ({ currentDate, currentUser, progressNav, setProgressDateDisplay, progressDateDisplay, incrementProgressNav, decrementProgressNav }) => {
    const [dates, setDates] = useState([]);
    const [percentages, setPercentages] = useState([]);

    useEffect(() => {
        const dt = new Date();
        const parsedDate = currentDate.split('-');
        let monthField = '';

        if (progressNav !== 0) {
            dt.setMonth(new Date().getMonth() + progressNav);
            monthField = `${dt.toLocaleDateString('en-gb', { month: 'numeric' })}-${dt.getFullYear()}`;
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
        }

        if (currentUserId) {
            runAsyncFunc();
        }

    }, [currentUser, progressNav, currentDate, setProgressDateDisplay]);

    return (
        <ProgressPageContainer>
            {
                currentUser ? (
                    <>
                        <ProgressPageTitleContainer>
                            <ProgressPageButton onClick={() => decrementProgressNav()}>Back</ProgressPageButton>
                            <h2>{progressDateDisplay}</h2>
                            <ProgressPageButton onClick={() => incrementProgressNav()}>Forward</ProgressPageButton>
                        </ProgressPageTitleContainer>
                        <ProgressChart dates={dates}  percentages={percentages} /> 
                        <NoChartDataMessageContainer chartData={dates.length}>
                            <h2>No Data For This Month</h2>
                        </NoChartDataMessageContainer>
                    </>
                ) : (   
                        <h2>Login to see your progress chart</h2>
                )
            }
        </ProgressPageContainer>
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
