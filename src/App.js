"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { LoginView } from "./views/LoginView";
import { SignupView } from "./views/SignupView";
import { HomeView } from "./views/HomeView";
import Footer from './components/Footer';
import Header from './components/Header';



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
                <Header/>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route} />))}
                    </Switch>
                </Router>
                <Footer />
            </div>
           
        );
    }
}

