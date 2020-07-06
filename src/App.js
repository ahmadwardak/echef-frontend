"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, withRouter, Redirect, useParams } from 'react-router-dom';

import { LoginView } from "./views/LoginView";
import { SignupView } from "./views/SignupView";
import { ChefView } from "./views/ChefView";
import { RecipeFormView } from './views/RecipeFormView';
import { HomeView } from "./views/HomeView";
import { SearchView } from "./views/SearchView";
import { RecipeView } from "./views/RecipeView";
import { RecipeReviewFormView } from './views/RecipeReviewFormView';
import Footer from './components/FooterComponent/Footer.js';
import Header from './views/HeaderView';
import './App.css';


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'eChef',
            routes: [
                { component: HomeView, path: '/', exact: true },
                { component: SearchView, path: '/search' },
                { component: ChefView, path: '/chef' },
                { component: RecipeFormView, path: '/add' },
                { component: RecipeFormView, path: '/edit/:id' },
                { component: LoginView, path: '/login' },
                { component: SignupView, path: '/register' },
                { component: AccountView, path: '/account' },
                { component: RecipeView, path: '/recipe/:id' },
                { component: RecipeReviewFormView, path: '/reviews/:id' }
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
                        <Header />
                        <div className="content">
                            <Switch>
                                {this.state.routes.map((route, i) => (<Route key={i} {...route} />))}
                            </Switch>
                        </div>

                    </div>

                </Router>
                <Footer />
            </div>

        );
    }
}

