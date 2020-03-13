import comments from './comments';
import collects from './collects';
import usercenter from './usercenter';
import {combineReducers} from 'redux'
const initialState = {
    articleList: {
        pageNum:1,
        total:0,
        isFetching:true,
        data:[]
    },
    articleDetail:{
        isFetching:true,
        data:{}
    },
    currentTag:'首页',
    menuVisible:false
};

export const actionTypes = {
    GET_ARTICLE_LIST: "GET_ARTICLE_LIST",
    RESPONSE_ARTICLE_LIST: "RESPONSE_ARTICLE_LIST",
    GET_ARTICLE_DETAIL: "GET_ARTICLE_DETAIL",
    RESPONSE_ARTICLE_DETAIL: "RESPONSE_ARTICLE_DETAIL",
    TOGGLE_MENU_VISIBLE:'TOGGLE_MENU_VISIBLE'
};

export const actions = {
    get_article_list: function (tag = '', pageNum = 1) {
        return {
            type: actionTypes.GET_ARTICLE_LIST,
            tag,
            pageNum
        }
    },
    get_article_detail: function (id) {
        return {
            type: actionTypes.GET_ARTICLE_DETAIL,
            id
        }
    },
    toggle_menu_visible:function(boolean){
        return {
            type:actionTypes.TOGGLE_MENU_VISIBLE,
            visible:boolean
        }
    }
};

 function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ARTICLE_LIST:
            return {
                ...state,articleList:{...state.articleList, isFetching:true}
            }
        case actionTypes.RESPONSE_ARTICLE_LIST:
            var { list, pageNum, total, currentTag } = action.data;
            return {
                ...state, articleList:{ pageNum, total, isFetching:false, data:list }, currentTag:currentTag ? currentTag :'首页', menuVisible:false
            };
        case actionTypes.GET_ARTICLE_DETAIL:
            return {
                ...state, articleDetail:{...state.articleDetail, isFetching:true}
            }
        case actionTypes.RESPONSE_ARTICLE_DETAIL:
            return {
                ...state, articleDetail:{ data:action.data, isFetching:false }
            };
        case actionTypes.TOGGLE_MENU_VISIBLE:
            return {
                ...state,
                menuVisible:action.visible
            }
        default:
            return state;
    }
}

export default combineReducers({
    article:reducer,
    comments,
    collects,
    usercenter
})
