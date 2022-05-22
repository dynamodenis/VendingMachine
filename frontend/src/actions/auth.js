import axios from 'axios'
import {returnErrors} from './messages'
import {USER_LOADED,USER_LOADING,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS ,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL} from './types'

// GET USER USING TOKEN
export const loadUser = () => (dispatch, getState)=>{
    //User Loading
    dispatch({type: USER_LOADING});

    

    // get the user
    axios.get('/api/auth/user',configHeader(getState))
    .then(res =>{
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status))
        dispatch({
            type:AUTH_ERROR
        });
    });
}

// LOGIN A USER
export const login = (email, password) => (dispatch)=>{
    // Set Headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    // create the user details to send as json
    const body =JSON.stringify({email,password})

    // get login user
    axios.post('/api/auth/login',body,config)
    .then(res =>{
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status))
        dispatch({
            type:LOGIN_FAIL,
        });
    });
}

// REGISTER A USER
export const register = ({username,email, password}) => dispatch=>{
    // Set Headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    // create the user details to send as json
    const body =JSON.stringify({username,password,email})

    // get login user
    axios.post('/api/auth/register',body,config)
    .then(res =>{
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status))
        dispatch({
            type:REGISTER_FAIL,
        });
    });
}

// logout user
export const logout = () => (dispatch, getState)=>{

    // get the user
    axios.post('/api/auth/logout',null,configHeader(getState))
    .then(res =>{
        dispatch({ 
            type:LOGOUT_SUCCESS
        });
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status))
    });
}

// Setup the config with the token

export const configHeader = getState =>{
    // Get token from state
    const token =getState().auth.token;

    // Set Headers
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    // If token is set add the token to the headers
    if(token){
        config.headers['Authorization']=`Token ${token}`
    }
    return config
}