import {take,put,call, fork} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as FrontActionTypes} from '../reducers/frontReducer'

function* getArticleList (tag,pageNum) {
    try {
        return yield call(get, `/getArticles?pageNum=${pageNum}&isPublish=true&tag=${tag}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
    }
}

export function* getArticlesListFlow () {
    while (true){
        let req = yield take(FrontActionTypes.GET_ARTICLE_LIST);    
        let res = yield call(getArticleList, req.tag, req.pageNum);
        if(res){
            if(res.code === 1){
                res.data.pageNum = req.pageNum;
                yield put({type: FrontActionTypes.RESPONSE_ARTICLE_LIST,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

function* getArticleDetail (id) {
    //yield put({type: IndexActionTypes.FETCH_START});
    try {
        return yield call(get, `/getArticleDetail?id=${id}`);
    } catch (err) {
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    } finally {
        //yield put({type: IndexActionTypes.FETCH_END})
    }
}

function* getArticleDetailFlow () {
    while (true){
        let req = yield take(FrontActionTypes.GET_ARTICLE_DETAIL);
        let res = yield call(getArticleDetail,req.id);
        if(res){
            if(res.code === 1){
                yield put({type: FrontActionTypes.RESPONSE_ARTICLE_DETAIL,data:res.data});
            }else{
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
        }
    }
}

export default function* frontSaga(){
    yield fork(getArticlesListFlow);
    yield fork(getArticleDetailFlow);
}