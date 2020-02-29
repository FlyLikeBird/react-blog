import {combineReducers} from 'redux'
import { fromJS } from 'immutable';

var initialState = {
    total:0,
    pageNum:1,
    data:[]
};

export const actionTypes = {
    FETCH_COMMENTS:'FETCH_COMMENTS',
    RECEIVE_COMMENTS:'RECEIVE_COMMENTS',
    ADD_COMMENT:'ADD_COMMENT',
    OPERATE_COMMENT_START:'OPERATE_COMMENT_START',
    OPERATE_COMMENT_RESULT:'OPERATE_COMMENT_RESULT',
    OPEN_REPLY:'OPEN_REPLY',
    ADD_REPLY:'ADD_REPLY',
    RECEIVE_REPLY:'RECEIVE_REPLY',
    TOGGLE_REPLY:'TOGGLE_REPLY',
    CLEAR_MOTION:'CLEAR_MOTION'
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
    operate_comment:function( commentid, action, isCancel, parentcommentid ){
        return {
            type:actionTypes.OPERATE_COMMENT_START,
            commentid,
            action,
            isCancel,
            parentcommentid
        }
    },
    open_reply:function(commentid, parentcommentid){
        return {
            type:actionTypes.OPEN_REPLY,
            commentid,
            parentcommentid
        }
    },
    add_reply:function(data){
        return {
            type:actionTypes.ADD_REPLY,
            data
        }
    },
    toggle_reply:function(pageNum, commentid){
        return {
            type:actionTypes.TOGGLE_REPLY,
            pageNum,
            commentid
        }
    }
};

function byId(state, action){
    switch(action.type){
        case actionTypes.OPERATE_COMMENT_RESULT:
            var { data, operateType, isCancel } = action;
            if (isCancel){
                // 取消点赞、反对状态
                state[operateType+'Users'] = state[operateType+'Users'].filter(item=>item.user._id != data.user._id);
            } else {
                //  将当前用户的操作保存起来
                state[operateType+'Users'].push(data);
            } 
            operateType === 'like' ? state.likeMotion = true : state.dislikeMotion = true ;
            return {...state};
        case actionTypes.CLEAR_MOTION:
            state.likeMotion = false;
            state.dislikeMotion = false;
            return {...state};
        case actionTypes.OPEN_REPLY:
            state.visible = !state.visible;
            return {...state};
    }
}

function byReply(state, action){
    state.replyObj = {
        ...state.replyObj,
        subComments:state.replyObj.subComments.map(reply=>{
            if (reply._id === action.commentid) return byId(reply, action);
            return reply;
        })
    }
    return {...state};
}

/*

    replies = {
        total,
        pageNum,
        subComments,
    }
*/
function checkComments(comments){
    return comments.map(item=>{
            item.replyObj = reduceReply(item.replies);
            return item;
        })
}

function reduceReply(state, pageNum=1){
    var startIndex = ( pageNum - 1) *5;
    var endIndex = 5 * pageNum ;
    var subComments = state.slice(startIndex, endIndex);
    return {
        total:state.length,
        pageNum,
        subComments
    }
}

export default function comments(state=initialState,action){
    //console.log(action);
    switch(action.type){  
        case actionTypes.RECEIVE_COMMENTS:
            var { data } = action;
            var comments = checkComments(data.comments);
            return {
                ...state,
                data:comments,
                pageNum:data.pageNum,
                total:data.total
            }
        case actionTypes.OPERATE_COMMENT_RESULT:
            var { commentid, parentcommentid } = action;
            if (parentcommentid){
                // 二级评论
                return {
                    ...state,
                    data:state.data.map(item=>{
                        if(item._id === parentcommentid) return byReply(item,action);                                                      
                        return item;
                    })
                }
            } else {
                // 一级评论
                return {
                    ...state,
                    data:state.data.map(item=>{                        
                        if (item._id === commentid) return byId(item, action);
                        return item;
                    })
                }
            }
        case actionTypes.CLEAR_MOTION:
            var { commentid, parentcommentid } = action;
            if (parentcommentid){
                return {
                    ...state,
                    data:state.data.map(item=>{
                        if(item._id === parentcommentid) return byReply(item,action);                                                      
                        return item;
                    })
                }
            } else {
                return {
                    ...state,
                    data:state.data.map(item=>{
                        if (item._id === commentid ) return byId(item, action);
                        return item;
                    })
                }
            }
        case actionTypes.OPEN_REPLY:
            var { commentid, parentcommentid } = action;
            if (parentcommentid){
                return {
                    ...state,
                    data:state.data.map(item=>{
                        if (item._id === parentcommentid) return byReply(item,action);
                        return item;
                    })
                }
            } else {
                return {
                    ...state,
                    data:state.data.map(item=>{
                        if (item._id === commentid) return byId(item, action);
                        return item;
                    })
                }
            }
        case actionTypes.RECEIVE_REPLY:
            var { data, commentid } = action;
            return {
                ...state,
                data:state.data.map(item=>{
                    if (item._id ===commentid) {
                        item.replies = item.replies.concat(data);
                        item.replyObj = reduceReply(item.replies, item.replyObj.pageNum);
                        return { ...item };
                    }
                    return item;
                })
                
            }
        case actionTypes.TOGGLE_REPLY:
            var { commentid, pageNum } = action;
            return {
                ...state,
                data:state.data.map(item=>{
                    if (item._id === commentid) {
                        item.replyObj = reduceReply(item.replies, pageNum);
                        return {...item}
                    }
                    return item;
                })
            }
        default:
            return state;
    }
}


