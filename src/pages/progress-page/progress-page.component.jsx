import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchDatesAndPercentages } from '../../firebase/firebase.utils';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCurrentDate } from '../../redux/calendar/calendar.selectors';
import { selectProgressDateDisplay, selectProgressNav } from '../../redux/progress/progress.selectors';

import { setProgressDateDisplay, incrementProgressNav, decrementProgressNav } from '../../redux/progress/progress.actions';

import ProgressChart from "../../components/progress-chart/progress-chart.component";

import {
    ProgressPageContainer,
    ProgressPageTitleContainer,
    ProgressPageButton,
    NoChartDataMessageContainer,
} from './progress-page.styles';

const ProgressPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const currentDate = useSelector(selectCurrentDate);
    const progressNav = useSelector(selectProgressNav);
    const progressDateDisplay = useSelector(selectProgressDateDisplay);

    const [dates, setDates] = useState([]);
    const [percentages, setPercentages] = useState([]);

    useEffect(() => {
        if (!currentUser) return;

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
        dispatch(setProgressDateDisplay(`${dt.toLocaleDateString('en-gb', { month: 'long' })} ${year}`));

        const currentUserId = currentUser ? currentUser.id : null;

        const runAsyncFunc = async () => {
            const { dates, percentages} = await fetchDatesAndPercentages(currentUserId, monthField);
            setDates(dates);
            setPercentages(percentages);
        }

        if (currentUserId) {
            runAsyncFunc();
        }

    }, [progressNav]);

    if (!currentUser) {
        return (<h2 style={{ margin: 'auto', marginTop: '40vh', width: '40vw' }}>Please login to view your progress chart</h2>)
    }

    return (
        <ProgressPageContainer>

            <ProgressPageTitleContainer>
                <ProgressPageButton onClick={() => dispatch(decrementProgressNav())}>Back</ProgressPageButton>
                <h2>{progressDateDisplay}</h2>
                <ProgressPageButton onClick={() => dispatch(incrementProgressNav())}>Forward</ProgressPageButton>
            </ProgressPageTitleContainer>

            <ProgressChart dates={dates}  percentages={percentages} />

            <NoChartDataMessageContainer chartData={dates.length}>
                <h2>No Data For This Month</h2>
            </NoChartDataMessageContainer>
            
        </ProgressPageContainer>
    );
}

export default ProgressPage;
