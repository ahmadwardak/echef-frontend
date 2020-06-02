"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { LoginView } from "./views/LoginView";
import { SignupView } from "./views/SignupView";
import { HomeView } from "./views/HomeView";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'eChef',
            routes: [
                { component: HomeView, path: '/', exact: true },
                { component: LoginView, path: '/login' },
                { component: SignupView, path: '/register' }
            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <div>
                <p> Something</p>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route} />))}
                    </Switch>
                </Router>
            </div>
        );
    }
}

