import { createAction, createReducer } from '@reduxjs/toolkit';

const addToCart = createAction('Add movie to cart');
const removeFromCart = createAction('Remove movie from cart');
const addToTotalSum = createAction('Add price of movie to total sum');
const removeFromTotalSum = createAction('Remove price of movie from total sum');

const actions = { addToCart, removeFromCart, addToTotalSum, removeFromTotalSum };

const initialState = {
    product: [],
    total: 0
}

const reducer = createReducer(initialState, {
    [addToCart] : (state, action) => {

        return {
            ...state,
            product: [...state.product, action.payload]
        };
    },
    [removeFromCart] : (state, action) => {
        
        const id = action.payload.id

        return {
            ...state,
            product: state.product.filter((product) => product.id !== id)
        };
    },
    [addToTotalSum] : (state, action) => {

        return {
            ...state,
            total: state.total + action.payload
        }
    },
    [removeFromTotalSum] : (state, action) => {

        return {
            ...state,
            total: state.total - action.payload
        }
    }
})

export { actions, reducer };