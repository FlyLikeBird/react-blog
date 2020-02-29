import { delay } from 'redux-saga'
import {take,put,call, fork, select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import { actionTypes as CollectActionTypes } from '../reducers/collects';
function* addIntoContent(uniquekey, collectId, isCancel){
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/collect/addIntoContent?uniquekey=${uniquekey}&collectId=${collectId}&isCancel=${isCancel ? 'true':''}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
       yield put({type: IndexActionTypes.FETCH_END})
    }
}

function* addIntoContentFlow(){
    while(true){
        var action = yield take(CollectActionTypes.ADDINTO_CONTENT_START);
        yield call(addIntoContent, action.uniquekey, action.collectId, action.isCancel);
        var state = yield select();
        var detail = state.front.article.articleDetail.data;
        yield put({type:CollectActionTypes.ADDINTO_CONTENT_RESULT, data:detail, collectId:action.collectId, isCancel:action.isCancel, uniquekey:action.uniquekey});
        yield delay(500);
        yield put({type:CollectActionTypes.CLEAR_MOTION, collectId:action.collectId});
    }
}

function* getCollects(user) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/collect/getCollects?user=${user}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
       yield put({type: IndexActionTypes.FETCH_END})
    }
}

function* getCollectsFlow () {
    while (true){
        var req = yield take(CollectActionTypes.OPEN_MODAL);
        var state = yield select();
        var user = state.globalState.userInfo.userId;
        if (user){
            yield put({type:CollectActionTypes.TOGGLE_MODAL, visible:true});
            var res = yield call(getCollects, user);
            yield put({type:CollectActionTypes.COLLECTS_RECEIVED, data:res.data});
        } else {
            yield put({type:IndexActionTypes.SET_MESSAGE, msgContent:'请登录后再操作!', msgType:0});
        }
    }
}

function* addCollect(user, tag, privacy) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/collect/addCollect?user=${user}&tag=${tag}&privacy=${privacy}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

function* addCollectFlow () {
    while (true){
        var action = yield take(CollectActionTypes.ADD_COLLECT_START);
        var state = yield select();
        var user = state.globalState.userInfo.userId;
        if (user){
            var res = yield call(addCollect, user, action.tag, action.privacy);
            if(res.code === 1){
                yield put({type: CollectActionTypes.ADD_COLLECT_RESULT, data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        } else {
            yield put({type:IndexActionTypes.SET_MESSAGE, msgContent:'请登录后再操作!', msgType:0});
        }   
    }
}


export default function* collectSaga(){
    yield fork(getCollectsFlow);
    yield fork(addIntoContentFlow);
    yield fork(addCollectFlow);
}