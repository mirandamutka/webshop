import { createAction, createReducer } from '@reduxjs/toolkit';

const addToCart = createAction('Add movie to cart');
const removeFromCart = createAction('Remove movie from cart');

const actions = { addToCart, removeFromCart };

const initialState = {
    product: []
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
        
    }
})

export { actions, reducer };