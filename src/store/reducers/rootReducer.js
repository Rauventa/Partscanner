import {combineReducers} from 'redux';
import groupReducer from './Group/groupReducer'

export default combineReducers({
    groupReducer: groupReducer
})