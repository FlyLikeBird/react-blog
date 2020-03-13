import { delay } from 'redux-saga'
import {take,put,call, fork, select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import { actionTypes as UsercenterActionTypes } from '../reducers/usercenter';

function* followOtherUser(user, followUser, isCancel){
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/user/follow?user=${user}&followUser=${followUser}&isCancel=${isCancel ? 'true':''}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
       yield put({type: IndexActionTypes.FETCH_END})
    }
}

function* followUserFlow(){
    while(true){
        var action = yield take(UsercenterActionTypes.FOLLOW_FETCH);
        var state = yield select();
        var user = state.globalState.userInfo.userId;
        if (user){
            var res = yield call(followOtherUser, user, action.followUser, action.isCancel);
            if (res&&res.code ===1){
                yield put({type:UsercenterActionTypes.CHECK_FOLLOW_RESULT, followUser:action.followUser, isFollowed:res.data})
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        } else {
            yield put({type:IndexActionTypes.SET_MESSAGE, msgContent:'请登录后再操作!', msgType:0});
        }
    }
}

function* checkFollow(user, followUser){
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/user/checkFollow?user=${user}&followUser=${followUser}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
       yield put({type: IndexActionTypes.FETCH_END})
    }
}

function* checkFollowFlow(){
    while(true){
        var action = yield take(UsercenterActionTypes.CHECK_FOLLOW_START);
        var state = yield select();
        var user = state.globalState.userInfo.userId;
        if (user){
            var res = yield call(checkFollow, user, action.followUser);
            if (res&&res.code ===1){
                yield put({type:UsercenterActionTypes.CHECK_FOLLOW_RESULT, followUser:action.followUser, isFollowed:res.data})
            } else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        } else {
            yield put({type:UsercenterActionTypes.CHECK_FOLLOW_RESULT, followUser:action.followUser, isFollowed:0})
        }
    }
}
function* getUserInfo(user) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/user/getUserInfo?user=${user}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
       yield put({type: IndexActionTypes.FETCH_END})
    }
}

function* getUserInfoFlow () {
    while (true){
        var action = yield take(UsercenterActionTypes.USERCENTER_FETCH);       
        var res = yield call(getUserInfo, action.user);
        if (res && res.code === 1){
            yield put({type:UsercenterActionTypes.USERCENTER_RESULT, data:res.data});
        } else {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
        }             
    }
}

export default function* usercenterSaga(){
    yield fork(getUserInfoFlow);
    yield fork(followUserFlow);
    yield fork(checkFollowFlow);
}