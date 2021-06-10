import {createAction, createReducer } from '@reduxjs/toolkit';

const getMovieDetails = createAction('get movie details');

const actions = { getMovieDetails };

const initialState = {
    movie: null
}

const reducer = createReducer(initialState, {
    [getMovieDetails] : (state, action) => {
        return {
            ...state,
            movie: action.payload
        };
    }
})

export { actions, reducer };