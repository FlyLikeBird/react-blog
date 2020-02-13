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
    ADD_REPLY:'ADD_REPLY',
    RECEIVE_REPLY:'RECEIVE_REPLY'
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

function reply(state, action, user){
    switch(action.type){
       case actionTypes.OPERATE_COMMENT_RESULT:
            var { operateType } = action;
            return {
                ...state,
                replies:[
                    ...state.replies,

                ]
            }
       default:
            return {
                ...state,
                visible:false,
                isLiked:state.likeUsers.map(item=>item.user._id).includes(user) ? true : false,
                isDisliked:state.dislikeUsers.map(item=>item.user_id).includes(user) ? true : false
            }
    }
}

function allReplies(state=[], action){
    switch(action.type){
        default : 
            return state;
    }
}

function replyById(state={}, action){
    switch(action.type){
        default:
            return state;
    }
}

function getReply(state, user){
    var obj = {};
    obj.replyById = state.reduce((result, subComment)=>{
        subComment.visible = false;
        subComment.isLiked = subComment.likeUsers.map(item=>item.user._id).includes(user) ? true : false;
        subComment.isDisliked = subComment.dislikeUsers.map(item=>item.user._id).includes(user) ? true : false ;
        result[subComment._id] = subComment;
        return result;
    },{});
    obj.replyIds = state.map(item=>item._id);
    return obj;
}

function reply(state, action){
    switch(action.type){
        case actionTypes.OPERATE_COMMENT_RESULT:
            var { operateType, data, commentid, parentcommentid } = action;
            var option = operateType === 'like' ? 'isLiked' : 'isDisliked';
            return {
                ...state,
                [commentid]:{
                    [option]:!state[commentid][option],
                    [operateType+'Users']:data
                }
            }
    }
}
/*
reply:{
            repliesIds:[],
            replyById:{
                total:0,
                pageNum:1
            }
        } 
*/  
function byId(state = initialState.byId, action){
    switch(action.type){
        case actionTypes.RECEIVE_COMMENTS:
            var { user, data } = action;
            return {
                ...state,
                ...data.comments.reduce((obj, comment)=>{
                    comment.visible = false; 
                    comment.isLiked = comment.likeUsers.map(item=>item.user._id).includes(user) ? true : false;
                    comment.isDisliked = comment.dislikeUsers.map(item=>item.user._id).includes(user) ? true : false ;
                    //comment.replies =  getReply(comment.replies, user);               
                    obj[comment._id] = comment;
                    return obj;
                },{}),
                total:data.total,
                pageNum:data.pageNum
            }
        case actionTypes.OPERATE_COMMENT_RESULT:
            var { operateType, data, commentid, parentcommentid } = action;
            var option = operateType === 'like' ? 'isLiked' : 'isDisliked';
            if (parentcommentid){
                return {
                    ...state,
                    [parentcommentid]:{
                        ...state[parentcommentid],
                        replies:{
                            ...state[parentcommentid].replies,

                        }
                    }
                }
            } else {
                return {
                    ...state,
                    [commentid] : {
                        ...state[commentid],
                        [option]:!state[commentid][option],
                        [operateType+'Users']:data
                    }
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
        case actionTypes.RECEIVE_REPLY:
            console.log(action.commentid);
            return {
                ...state,
                [action.commentid]:{
                    ...state[action.commentid],
                    replies:action.data.comments.map(subComment=>reply(subComment,action))
                }              
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
    console.log(state);
    return state.allIds.map(id=>state.byId[id])
    /*
    return state.allIds.map(id=>{
        var comment = state.byId[id] ;
        var obj = {...comment};
        obj.replies = comment.replies.replyIds.map(id=>{
            return comment.replies.replyById[id];
        })
        
        return obj;
    })
    */
}

export default combineReducers({
    byId,
    allIds
})

