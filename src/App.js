"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, withRouter, Redirect, useParams } from 'react-router-dom';

import { LoginView } from "./views/LoginView";
import { SignupView } from "./views/SignupView";
import { AboutView } from "./views/AboutView";
import { ContactView } from "./views/ContactView";
import { AccountView } from "./views/AccountView";
import { ChefView } from "./views/ChefView";
import { RecipeFormView } from './views/RecipeFormView';
import { HomeView } from "./views/HomeView";
import { SearchView } from "./views/SearchView";
import { RecipeView } from "./views/RecipeView";
import { RecipeReviewFormView } from './views/RecipeReviewFormView';
import { CheckoutView } from './views/CheckoutView';
import Footer from './components/FooterComponent/Footer.js';
import Header from './views/HeaderView';
import './App.css';
import UserService from './services/UserService';


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'eChef',
            routes: [
                {
                    render: (props) => {
                        if (UserService.getCurrentUser().accounttype === 'chef') {
                            return (<ChefView {...props} title={"Chef"} />)
                        }
                        else {
                            return (<HomeView {...props} title={"eChef Home"} />)
                        }
                    }, path: '/', exact: true
                },
                {
                    render: (props) => {
                        return (<SearchView {...props} title={"Search"} />)
                    }, path: '/search'
                },
                {
                    render: (props) => {
                        return (<ChefView {...props} title={"Chef"} />)
                    }, path: '/chef'
                },
                {
                    render: (props) => {
                        return (<RecipeFormView {...props} title={"Add Recipe"} />)
                    }, path: '/add'
                },
                {
                    render: (props) => {
                        return (<RecipeFormView {...props} title={"Update Recipe"} />)
                    }, path: '/edit/:id'
                },
                {
                    render: (props) => {
                        return (<LoginView {...props} title={"Login"} />)
                    }, path: '/login'
                },
                {
                    render: (props) => {
                        return (<SignupView {...props} title={"Register"} />)
                    }, path: '/register'
                },
                {
                    render: (props) => {
                        return (<AccountView {...props} title={"Account"} />)
                    }, path: '/account'
                },
                {
                    render: (props) => {
                        return (<RecipeView {...props} title={"Recipe"} />)
                    }, path: '/recipe/:id'
                },
                {
                    render: (props) => {
                        return (<AboutView {...props} title={"About our project"} />)
                    }, path: '/about'
                },
                {
                    render: (props) => {
                        return (<ContactView {...props} title={"Contact"} />)
                    }, path: '/contact'
                },
                {
                    render: (props) => {
                        return (<RecipeReviewFormView {...props} title={"Recipe Review"} />)
                    }, path: '/reviews/:id'
                },
                {
                    render: (props) => {
                        return (<CheckoutView {...props} title={"Purchase"} />)
                    }, path: '/checkout'
                }
            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {

        const { title } = this.state;
        //console.log(title);
        return (
            <div>
                <Router>
                    <div>
                        <Header />
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

