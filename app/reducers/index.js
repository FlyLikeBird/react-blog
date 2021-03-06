import front from './frontReducer'
//import {combineReducers} from 'redux-immutable'
import { combineReducers } from 'redux'
import admin from './admin'


const initialState = {
    isFetching: true,
    msg: {
        type: 1,//0失败 1成功
        content: ''
    },
    userInfo: {},
    userAuth:true
};

export const actionsTypes = {
    FETCH_START: "FETCH_START",
    FETCH_END: "FETCH_END",
    USER_LOGIN: "USER_LOGIN",
    USER_LOGINOUT:"USER_LOGINOUT",
    USER_REGISTER: "USER_REGISTER",
    RESPONSE_USER_INFO: "RESPONSE_USER_INFO",
    SET_MESSAGE: "SET_MESSAGE",
    USER_AUTH:"USER_AUTH"
};

export const actions = {
    get_login: function (data) {
        return {
            type: actionsTypes.USER_LOGIN,
            data
        }
    },
    get_register: function (data) {
        return {
            type: actionsTypes.USER_REGISTER,
            data
        }
    },
    get_loginout:function(){
        return {
            type:actionsTypes.USER_LOGINOUT
        }
    },
    set_msg:function(msgType, msgContent){
        return {
            type:actionsTypes.SET_MESSAGE,
            msgType,
            msgContent
        }
    },
    clear_msg: function () {
        return {
            type: actionsTypes.SET_MESSAGE,
            msgType: 1,
            msgContent: ''
        }
    },
    user_auth:function () {
        return{
            type:actionsTypes.USER_AUTH
        }
    }
};

export function reducer(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.FETCH_START:
            return {
                ...state, isFetching: true
            };
        case actionsTypes.FETCH_END:
            return {
                ...state, isFetching: false
            };
        case actionsTypes.SET_MESSAGE:
            return {
                ...state,
                isFetching: false,
                msg: {
                    type: action.msgType,
                    content: action.msgContent
                }
            };
        case actionsTypes.USER_LOGINOUT:
            return {
                ...state,userInfo:{}
            };
        case actionsTypes.RESPONSE_USER_INFO:
            return {
                ...state, userInfo: action.data, userAuth:false
            };
        default:
            return state
    }
}

export default combineReducers({
    front,
    globalState: reducer,
    admin
})


