import { AUTH, ERROR } from '../constants/actionTypes';
import * as api from '../api';

export const signIn = (form, history) => async (dispatch) => {
    try {
        //log in the user
        const { data } = await api.signIn(form);
        dispatch({ type: AUTH, data });

        history.push('/');
    }
    catch (error) {
        const errorMessage = error.response?.data;
         dispatch({ type: ERROR, errorMessage });
        
    }
}

export const signUp = (form, history) => async (dispatch) => {
    try {
        //sign up the user
        const { data } = await api.signUp(form);

        dispatch({ type: AUTH, data });

        history.push('/');
    }
    catch (error) {
        const errorMessage = error.response?.data;
        dispatch({ type: ERROR, errorMessage });
    }
}