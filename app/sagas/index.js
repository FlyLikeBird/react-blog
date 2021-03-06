import {fork, call} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth, loginOutFlow } from './homeSaga'
import {get_all_users_flow} from './adminManagerUsersSaga'
import {getAllTagsFlow, addTagFlow, delTagFlow} from './adminManagerTagsSaga'
import {saveArticleFlow} from './adminManagerNewArticleSaga'
import frontSaga from './frontSaga'
import commentSaga from './commentSaga';
import collectSaga from './collectSaga';
import usercenterSaga from './usercenterSaga';

export default function* rootSaga() {
    yield fork(user_auth);
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(loginOutFlow);
    yield fork(get_all_users_flow);
    yield fork(getAllTagsFlow);
    yield fork(addTagFlow);
    yield fork(delTagFlow);    
    yield fork(frontSaga);
    yield fork(commentSaga);
    yield fork(collectSaga);
    yield fork(usercenterSaga);
}
