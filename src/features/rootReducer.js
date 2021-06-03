import { combineReducers } from 'redux';
import { reducer as apiReducer } from './apiCall';
import { reducer as cartReducer } from './shoppingCart';

const rootReducer = combineReducers({
    apiCall: apiReducer,
    shoppingCart : cartReducer
})

export { rootReducer };