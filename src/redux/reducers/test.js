import {combineReducers} from 'redux'
import defaultState from '../store/text'
function pageTitle (state = defaultState.pageTitle,action){
    switch (action.type){
        case "SET_PAGE_TITLE":
            return action.type;
        default:
            return state
    }
}