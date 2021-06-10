import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import MovieDetails from './components/MovieDetails';
import Checkout from './components/Checkout';
import Receipt from './components/Receipt';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" exact component={App} />
                    <Route path="/MovieDetails" component={MovieDetails} />
                    <Route path="/Checkout" component={Checkout} />
                    <Route path="/Receipt" component={Receipt} />
                </Switch>
            </Router>
        )
    }
}