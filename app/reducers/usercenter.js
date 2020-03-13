import {combineReducers} from 'redux'

var initialState = {
    userInfo:{},
    userFollows:[],
    userFans:[],
    userCollects:[],
    isFetching:true,
    checkFollow:{},
    visible:false,
    userArticles:[]
};

export const actionTypes = {
    USERCENTER_FETCH:'USERCENTER_FETCH',
    USERCENTER_RESULT:'USERCENTER_RESULT',
    FOLLOW_FETCH:'FOLLOW_FETCH',
    CHECK_FOLLOW_START:'CHECK_FOLLOW_START',
    CHECK_FOLLOW_RESULT:'CHECK_FOLLOW_RESULT',
    TOGGLE_VISIBLE:'TOGGLE_VISIBLE'
};

export const actions = { 
    get_userInfo:function(user){
        return { type:actionTypes.USERCENTER_FETCH, user}
    },
    follow_user:function(followUser, isCancel){
        return { type:actionTypes.FOLLOW_FETCH, followUser, isCancel}
    },
    check_follow:function(user, followUser){
        return { type:actionTypes.CHECK_FOLLOW_START, user, followUser};
    },
    toggle_visible:function(boolean){
        return { type:actionTypes.TOGGLE_VISIBLE, visible:boolean }
    }
    
};


export default function usercenter(state=initialState,action){
    //console.log(action);
    switch(action.type){  
        case actionTypes.USERCENTER_RESULT:
            var { userFollows, userFans, userCollects, userArticles } = action.data;
            return {
                ...state,
                userInfo:action.data,
                userFollows,
                userFans,
                userCollects,
                userArticles,
                isFetching:false
            }
        case actionTypes.CHECK_FOLLOW_RESULT: 
            return {
                ...state,
                checkFollow:{...state.checkFollow, [action.followUser]:action.isFollowed}
            }
        case actionTypes.TOGGLE_VISIBLE:
            return {
                ...state,
                visible:action.visible
            }
        default:
            return state;
    }
}


