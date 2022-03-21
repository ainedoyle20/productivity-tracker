import UserActionTypes from './user.types';

export const toggleLogin = () => ({
    type: UserActionTypes.TOGGLE_LOGIN,
});

export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user,
});
