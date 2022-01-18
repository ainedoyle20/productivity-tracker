import UserActionTypes from './user.types';

const INITIAL_STATE = {
    showLogin: false,
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.TOGGLE_LOGIN:
            return {
                ...state,
                showLogin: !state.showLogin
            }
        default :
            return state;
    }
}

export default userReducer;
