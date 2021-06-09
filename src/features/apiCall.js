import { createAction, createReducer } from '@reduxjs/toolkit';

const getDataFromSearch = createAction('get data from search');
const getDataFromId = createAction('get data from id');
const getDataFromTrening = createAction('get data from trending')

const actions = { getDataFromSearch, getDataFromId, getDataFromTrening };
const api_key = '7ab73473a05278044ef701c06449633a'

const initialState = {
    url: null
}

const reducer = createReducer(initialState, {
    [getDataFromSearch] : (state, action) => {
        return {
            ...state,
            url:  `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${action.payload}`
        }
    },
    
    [getDataFromId] : (state, action) => {
        return {
            ...state,
            url: `https://api.themoviedb.org/3/movie/${action.payload}?api_key=${api_key}`
        }
    },

    [getDataFromTrening] : (state, action) => {
        return {
            ...state,
            url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_key}`
        }
    }

})

export { actions, reducer };