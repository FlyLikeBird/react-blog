import {combineReducers} from 'redux'

var initialState = {
    byId:{
        total:0,
        pageNum:1
    },
    allIds:[]
};

export const actionTypes = {
    FETCH_COMMENTS:'FETCH_COMMENTS',
    RECEIVE_COMMENTS:'RECEIVE_COMMENTS',
    ADD_COMMENT:'ADD_COMMENT',
    OPERATE_COMMENT_START:'OPERATE_COMMENT_START',
    OPERATE_COMMENT_RESULT:'OPERATE_COMMENT_RESULT',
    OPEN_REPLY:'OPEN_REPLY',
    ADD_REPLY:'ADD_REPLY'
};

export const actions = { 
    get_article_comments:function(uniquekey, pageNum = 1, sort='time'){
        return {
            type:actionTypes.FETCH_COMMENTS,
            uniquekey,
            pageNum,
            sort
        }
    },
    add_comment:function(data){
        return {
            type:actionTypes.ADD_COMMENT,
            data
        }
    },
    operate_comment:function( commentid, action, isCancel ){
        return {
            type:actionTypes.OPERATE_COMMENT_START,
            commentid,
            action,
            isCancel
        }
    },
    open_reply:function(commentid){
        return {
            type:actionTypes.OPEN_REPLY,
            commentid
        }
    },
    add_reply:function(data){
        return {
            type:actionTypes.ADD_REPLY,
            data

        }
    }
};

function reply(state, action){

}

function byId(state = initialState.byId, action){
    switch(action.type){
        case actionTypes.RECEIVE_COMMENTS:
            return {
                ...state,
                ...action.data.comments.reduce((obj, comment)=>{
                    comment.visible = false;
                    obj[comment._id] = comment;
                    return obj;
                },{}),
                total:action.data.total,
                pageNum:action.data.pageNum
            }
        case actionTypes.OPERATE_COMMENT_RESULT:
            var type = action.operateType ; 
            return {
                ...state,
                [action.commentid] : {
                    ...state[action.commentid],
                    [type+'Users']:action.data
                }
            }       
        case actionTypes.OPEN_REPLY:
            return {
                ...state,
                [action.commentid]:{
                    ...state[action.commentid],
                    visible:!state[action.commentid].visible
                }
            }
        case actionTypes.ADD_REPLY:
            return {
                ...state
                
            }
        default :
            return state;
    }
}

function allIds(state= initialState.allIds, action){
    switch(action.type){
        case actionTypes.RECEIVE_COMMENTS:
            return action.data.comments.map(item=>item._id);
        default:
            return state;
    }
}

export function getComments(state){
    var userid = state.globalState.userInfo.userId;
    var comments = state.front.comments;
    return comments.allIds.map(id=>{
        var comment = comments.byId[id];
        comment.isLiked = comment.likeUsers.map(item=>item.user._id).includes(userid) ? true : false;
        comment.isDisliked = comment.dislikeUsers.map(item=>item.user._id).includes(userid) ? true : false ;
        return comment;
    })
}

export default combineReducers({
    byId,
    allIds
})

