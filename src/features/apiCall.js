import { createAction, createReducer } from '@reduxjs/toolkit';

const getDataFromSearch = createAction('get data from search');
const getDataFromId = createAction('get data from id');

const actions = { getDataFromSearch, getDataFromId};

const initialState = {
    url: ''
}

const reducer = createReducer(initialState, {
    [getDataFromSearch] : (state, action) => ({
        url:  `http://www.omdbapi.com/?s=${action.payload}&apikey=b7ed0243` 
    })
    ,
    [getDataFromId] : (state, action) => ({
        url: `http://www.omdbapi.com/?i=${action.payload}&apikey=b7ed0243`
    })
})

export { actions, reducer };