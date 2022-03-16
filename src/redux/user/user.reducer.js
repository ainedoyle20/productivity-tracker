import UserActionTypes from './user.types';

const INITIAL_STATE = {
    showLogin: false,
    currentUser: null,
    firebaseSub: false,
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.TOGGLE_LOGIN:
            return {
                ...state,
                showLogin: !state.showLogin
            }
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserActionTypes.OPEN_SUB:
            return {
                ...state,
                firebaseSub: true,
            }
        case UserActionTypes.CLOSE_SUB:
            return {
                ...state,
                firebaseSub: false,
            }
        default :
            return state;
    }
}

export default userReducer;
