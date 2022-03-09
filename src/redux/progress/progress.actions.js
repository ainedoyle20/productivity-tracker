import ProgressActionTypes from './progress.types';

export const incrementProgressNav = () => ({
    type: ProgressActionTypes.INCREMENT_PROGRESS_NAV,
});

export const decrementProgressNav = () => ({
    type: ProgressActionTypes.DECREMENT_PROGRESS_NAV,
});

export const setProgressDateDisplay = (progressDateDisplay) => ({
    type: ProgressActionTypes.SET_PROGRESS_DATE_DISPLAY,
    payload: progressDateDisplay,
});
