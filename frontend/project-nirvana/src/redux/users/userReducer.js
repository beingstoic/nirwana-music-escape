import { USER_LOGIN_SUCCESS, USER_LOGIN_FALIURE, USER_LOGOUT } from "./userActionTypes"

const initialState = {
    loading: false,
    users:[],
    error:'',
    userName:'',
    password:'',
    firstName:'',
}
export const userReducer = (state=(initialState), action)=>{
    switch(action.type){
        case USER_LOGIN_SUCCESS: console.log(action.payload);
                                return {
               ...state, users:action.payload
            }
        case USER_LOGIN_FALIURE: return {
            ...state, userLoggedIn: false, error:action.payload
        }
        case USER_LOGOUT: return {
            ...initialState
        }
        default: return state;
    }
}
// export  userReducer;