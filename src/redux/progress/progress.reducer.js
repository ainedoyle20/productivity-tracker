import ProgressActionTypes from './progress.types';

const INITIAL_STATE = {
    progressNav: 0,
    progressDateDisplay: '',
}

const progressReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ProgressActionTypes.INCREMENT_PROGRESS_NAV: 
            return {
                ...state,
                progressNav: state.progressNav + 1,
            }
        case ProgressActionTypes.DECREMENT_PROGRESS_NAV:
            return {
                ...state,
                progressNav: state.progressNav - 1,
            }
        case ProgressActionTypes.SET_PROGRESS_DATE_DISPLAY:
            return {
                ...state,
                progressDateDisplay: action.payload,
            }
        default:
            return state;
    };
};

export default progressReducer;
