import ScrollButtonActionTypes from './scrollButton.types';

const INITIAL_STATE = {
    showScrollButton: false,
}

const scrollButtonReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ScrollButtonActionTypes.TOGGLE_SCROLL_BUTTON:
            return {
                ...state,
                showScrollButton: action.payload,
            }
        default: {
            return state;
        }
    }
}

export default scrollButtonReducer;
