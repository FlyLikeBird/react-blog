import { delay } from 'redux-saga'
import {put, take, call, fork, select } from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import { actionTypes as CommentActionTypes } from '../reducers/comments'

export function* login(data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, `/user/login`, data);
    } catch (error) {
        yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:'用户名或密码错误',msgType:0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END});
    }
}

export function* loginout(){
    yield put({type:IndexActionTypes.FETCH_START});
    try{
        return yield call(get,'/user/loginout');
    } catch(error){
       yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:'',msgType:0});
    } finally {
        yield put({type:IndexActionTypes.FETCH_END});
    }
}

export function* register (data) {
    yield put({type:IndexActionTypes.FETCH_START});
    try {
        return yield call(post, '/user/register', data);
    } catch (error) {
        yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:'注册失败',msgType:0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END});
    }
}

export function* loginFlow() {
    while (true) {
        let request = yield take(IndexActionTypes.USER_LOGIN);
        let response = yield call(login, request.data);
        if(response&&response.code === 1){        
            yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:'登录成功!',msgType:1});
            yield put({type:IndexActionTypes.RESPONSE_USER_INFO,data:response.data});
        }
    }
}

export function* loginOutFlow(){
    while(true){
        yield take(IndexActionTypes.USER_LOGINOUT);
        yield call(loginout);
    }
}

export function* registerFlow () {
    while(true){
        let request = yield take(IndexActionTypes.USER_REGISTER);
        let response = yield call(register, request.data);
        if(response&&response.code === 1){
            yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:'注册成功!',msgType:1});
            yield put({type:IndexActionTypes.RESPONSE_USER_INFO,data:response.data})
        } else {
             yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:response.message,msgType:0});
        }

    }
}

export function* user_auth () {    
    try {
        yield put({type:IndexActionTypes.FETCH_START});
        let response = yield call(get,'/user/userInfo');
        yield put({type:IndexActionTypes.RESPONSE_USER_INFO,data:response.data});
    }catch (err){
        console.log(err);
    }finally {
        yield put({type: IndexActionTypes.FETCH_END});
    }
    
}