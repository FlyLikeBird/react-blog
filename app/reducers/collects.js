import {combineReducers} from 'redux'
import { fromJS } from 'immutable';

var initialState = {
    visible:false,
    inputVisible:false,
    data:[]
};

export const actionTypes = {
    COLLECTS_FETCH:'COLLECTS_FETCH',
    COLLECTS_RECEIVED:'COLLECTS_RECEIVED',
    OPEN_MODAL:'OPEN_MODAL',
    TOGGLE_MODAL:'TOGGLE_MODAL',
    EXPAND_CONTENT:'EXPAND_CONTENT',
    ADDINTO_CONTENT_START:'ADDINTO_CONTENT_START',
    ADDINTO_CONTENT_RESULT:'ADDINTO_CONTENT_RESULT',
    ADD_COLLECT_START:'ADD_COLLECT_START',
    ADD_COLLECT_RESULT:'ADD_COLLECT_RESULT',
    CLEAR_MOTION:'CLEAR_MOTION'
};

export const actions = { 
    fetch_collects:function(user){
        return { type:actionTypes.COLLECTS_FETCH, user}
    },
    open_modal:function(){
        return { type:actionTypes.OPEN_MODAL}
    },
    toggle_modal:function(visible){
        return { type:actionTypes.TOGGLE_MODAL, visible}
    },
    expand_content:function(id){
        return { type:actionTypes.EXPAND_CONTENT, id};
    },
    addInto_content:function(uniquekey, collectId, isCancel){
        return { type:actionTypes.ADDINTO_CONTENT_START, uniquekey, collectId, isCancel }
    },
    add_collect:function(tag, privacy){
        return { type:actionTypes.ADD_COLLECT_START, tag, privacy}
    }
};


export default function collects(state=initialState,action){
    //console.log(action);
    switch(action.type){  
        case actionTypes.TOGGLE_MODAL:
            return {
                ...state,
                visible:action.visible
            }
        case actionTypes.COLLECTS_RECEIVED:
            var { data } = action;
            return {
                ...state,
                data
            }
        case actionTypes.EXPAND_CONTENT:
            return {
                ...state,
                data:state.data.map(item=>{
                    if(item._id === action.id) {
                        item.showContent = !item.showContent;
                        return {...item};
                    }
                    return item;
                })
            }
        case actionTypes.ADDINTO_CONTENT_RESULT:
            console.log(action);
            return {
                ...state,
                data:state.data.map(item=>{
                    if(item._id === action.collectId){
                        if (action.isCancel){
                            item.content = item.content.filter(item=>item._id!=action.uniquekey);
                            item.hasMotion = 'rollOut';
                        } else {
                            item.content = item.content.concat(action.data);
                            item.hasMotion = 'rollIn';
                        }                       
                        return {...item};
                    }
                    return item;
                })
            }
        case actionTypes.ADD_COLLECT_RESULT:
            return {
                ...state,
                data:state.data.concat(action.data)
            }
        case actionTypes.CLEAR_MOTION:
            return {
                ...state,
                data:state.data.map(item=>{
                    if(item._id === action.collectId){
                        item.hasMotion = null;
                        return {...item};
                    }
                    return item;
                })

            }
        default:
            return state;
    }
}


