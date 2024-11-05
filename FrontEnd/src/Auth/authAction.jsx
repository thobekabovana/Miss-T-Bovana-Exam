import axios from 'axios';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const register = (userData) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/register', userData);
        dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.error });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
    }
};
