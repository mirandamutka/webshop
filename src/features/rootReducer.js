import { combineReducers } from 'redux';
import { reducer as apiReducer } from './apiCall';
import { reducer as cartReducer } from './shoppingCart';
import { reducer as movieReducer } from './movieDetails';

const rootReducer = combineReducers({
    apiCall: apiReducer,
    shoppingCart : cartReducer,
    movieDetails : movieReducer
})

export { rootReducer };