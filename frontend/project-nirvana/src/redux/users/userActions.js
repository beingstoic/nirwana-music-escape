import axios from 'axios'
import { USER_LOGIN_SUCCESS, USER_LOGIN_FALIURE, USER_LOGIN } from "./userActionTypes"
export const userLogin=()=>{
    return{
        type: USER_LOGIN
    }
}
export const userLoginSuccess=(users)=>{
    return{
        type: USER_LOGIN_SUCCESS,
        payload: users
    }
}

export const userLoginFaliure=(error)=>{
    return { type: USER_LOGIN_FALIURE,
        payload: error
}}

export const fetchUsers=()=>{
    return async (dispatch)=>{
        dispatch(userLogin())
        try {
            let resp = await axios.get('https://jsonplaceholder.typicode.com/users')
            dispatch(userLoginSuccess(resp.data))
        } catch (error) {
            console.log(error)
        }
    }
}