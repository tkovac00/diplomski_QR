import { AUTH, LOGOUT, ERROR } from '../constants/actionTypes';

/* eslint-disable */
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action ?.data}));
            return { ...state, authData: action ?.data};
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        case ERROR:
            return { ...state, authData: action ?.errorMessage };
        default:
            return state;
    }
}

export default authReducer;