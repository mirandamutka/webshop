import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import { rootReducer } from './features/rootReducer';

const store = configureStore({
  reducer : rootReducer
})

ReactDOM.render(
  <Router>
    <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// comment from Anastasia

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
