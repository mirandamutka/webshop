import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import history from './history';
import App from './App';
import MovieDetails from './components/MovieDetails';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/MovieDetails" component={MovieDetails} />
                </Switch>
            </Router>
        )
    }
}