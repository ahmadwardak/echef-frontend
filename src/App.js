"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch,withRouter, Redirect, useParams } from 'react-router-dom';

import { LoginView } from "./views/LoginView";
import { SignupView } from "./views/SignupView";
import { HomeView } from "./views/HomeView";
import {RecipeView} from "./views/RecipeView";
import Footer from './components/Footer';
import Header from './views/HeaderView';
import './App.css';


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'eChef',
            routes: [
                { component: HomeView, path: '/', exact: true },
                { component: LoginView, path: '/login' },
                { component: SignupView, path: '/register' },
                { component: RecipeView, path: '/recipe/:id' }
            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                    <Header/>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route} />))}
                    </Switch>
                    </div>
                    
                </Router>
                <Footer />
            </div>
           
        );
    }
}

