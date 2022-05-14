import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTodosForCurrentDay } from '../../firebase/firebase.utils';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCurrentDate } from '../../redux/calendar/calendar.selectors';

import { updateTodos } from '../../redux/todos/todos.actions';

import TodaysSchedule from '../../components/todays-schedule/todays-schedule.component';

const HomePage = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);
    const currentDate = useSelector(selectCurrentDate);

    useEffect(() => {
        if (!currentUser || !currentDate) return;

        const fetchFirebaseTodos = async () => {
            const todos = await fetchTodosForCurrentDay(currentUser.id, currentDate);
            dispatch(updateTodos(todos)); 
        }
    
        fetchFirebaseTodos();


    }, [currentUser, currentDate]);

    if (!currentUser) {
        return (<h2 style={{ margin: 'auto', marginTop: '40vh', width: '40vw' }}>Please login to view your tasks for today</h2>)
    }

    return (
        <TodaysSchedule />     
    );  
}

export default HomePage;
