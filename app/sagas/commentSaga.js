import {take,put,call, fork, select} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import { actionTypes as CommentActionTypes } from '../reducers/comments';

function* operateComment(commentid, userid, action, isCancel){
    yield put({type:IndexActionTypes.FETCH_START});
    try {
        return yield call(get,`/comment/operateComment?commentid=${commentid}&userid=${userid}&action=${action}&isCancel=${isCancel}`)
    } catch(err){
        yield put({type:IndexActionTypes.SET_MESSAGE, msgContent:'网络请求错误', msgType:0});
    } finally {
        yield put({type:IndexActionTypes.FETCH_END});
    }

}
function* operateCommentFlow(){
    while(true){
        var req = yield take(CommentActionTypes.OPERATE_COMMENT_START);
        var state = yield select();
        var user = state.globalState.userInfo.userId;
        if (user){
            var res = yield call(operateComment, req.commentid, user, req.action, req.isCancel );
            if ( res && res.code === 1){
                yield put({type:CommentActionTypes.OPERATE_COMMENT_RESULT, data:res.data, commentid:req.commentid, operateType:req.action});
            } else {
                yield put({type:IndexActionTypes.SET_MESSAGE, msgContent:res.message, msgType:0});
            }
        } else {
            yield put({type:IndexActionTypes.SET_MESSAGE, msgContent:'请登录后再操作!', msgType:0});
        }  
    }
}

function* getComments(uniquekey, pageNum, sort) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/comment/getComments?pageNum=${pageNum}&uniquekey=${uniquekey}&sort=${sort}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

function* getCommentsFlow () {
    while (true){
        let req = yield take(CommentActionTypes.FETCH_COMMENTS);
        let res = yield call(getComments, req.uniquekey, req.pageNum, req.sort);
        if(res){
            if(res.code === 1){
                res.data.pageNum = req.pageNum;
                yield put({type: CommentActionTypes.RECEIVE_COMMENTS,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

function* addComment (data) {
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, `/comment/addComment`, data);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

function* addCommentFlow () {
    while (true){
        var req = yield take(CommentActionTypes.ADD_COMMENT);
        var state = yield select();
        var user = state.globalState.userInfo.userId;
        if (user){
            req.data.append('user',user);
            var res = yield call(addComment, req.data);
            if(res.code === 1){
                res.data.pageNum = 1;
                yield put({type: CommentActionTypes.RECEIVE_COMMENTS, data:res.data });
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        } else {
            yield put({type:IndexActionTypes.SET_MESSAGE, msgContent:'请登录后再操作!', msgType:0});
        }   
    }
}

function* addReply(data){
    yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(post, `/comment/addReply`, data);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

function* addReplyFlow(){
    while (true){
        var req = yield take(CommentActionTypes.ADD_REPLY);
        var state = yield select();
        var user = state.globalState.userInfo.userId;
        if (user){
            req.data.append('user',user);
            var res = yield call(addReply, req.data);
            if(res.code === 1){

                yield put({type: CommentActionTypes.RECEIVE_REPLY, data:res.data });
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        } else {
            yield put({type:IndexActionTypes.SET_MESSAGE, msgContent:'请登录后再操作!', msgType:0});
        }   
    }
}

export default function* commentSaga(){
    yield fork(getCommentsFlow);
    yield fork(addCommentFlow);
    yield fork(operateCommentFlow);
    yield fork(addReplyFlow);
}