import { createAction, createReducer } from '@reduxjs/toolkit';

const addToCart = createAction('Add movie to cart');
const removeFromCart = createAction('Remove movie from cart');

const actions = { addToCart, removeFromCart };

const initialState = [];

const reducer = createReducer(initialState, {
    [addToCart] : (state, action) => {
            return [
                ...state,
                { product: {name: action.payload.Title, poster: action.payload.Poster} }
            ];
    },
    [removeFromCart] : (state, action) => {
        // filter() ?
    }
})

export { actions, reducer };