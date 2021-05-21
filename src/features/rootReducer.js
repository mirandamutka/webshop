import { combineReducers } from 'redux';
import { reducer as apiReducer } from './apiCall';

const rootReducer = combineReducers({
    apiCall: apiReducer
})

export { rootReducer };