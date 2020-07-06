import { render } from "react-dom";
import React, { useState } from "react";
import RecipeService from "../services/RecipeService";
import { RecipeList } from '../components/RecipeList';
import UserService from '../services/UserService';
import { Link } from "react-router-dom";

export class HomeView extends React.Component {

    constructor(props) {
        super(props);
        /*
        We use two arrays to store our recipes:
        Data stores all possible recipes
        filteredData stores filtered recipes
        */
        this.state = {
            data: [{ "title": "something" }],
            filteredData: [],
            loading: false,
            searchFilter: "",
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        }

        //Connects the onChange event to the function
        this.handleSearchChange = this.handleSearchChange.bind(this);

        this.logout = this.logout.bind(this);
    };

    // Normal React component Lifecycle
    componentWillMount() {
        this.setState({
            loading: true
        });

        // RecipeService.getAll().then((data) => {
        //     this.setState({
        //         data: [...data],
        //         filteredData: [...data],
        //         loading: false
        //     })
        // }).catch((e) => {
        //     console.error(e);
        // });
    }

    logout() {
        UserService.logout();
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        };
        if (this.props.location.pathname != '/login') {
            this.props.history.push('/login');
        }
        else {
            window.location.reload();
        }
    }

    // Handles the filter search
    handleSearchChange(event) {
        event.preventDefault();

        let currentList = this.state.data;
        let filteredList = [];
        //console.log("Current values: ", currentList);

        let val = event.target.value;
        if (val !== "") {
            filteredList = currentList.filter(recipe => recipe.Title.includes(val));
            console.log("Filtered values: ", filteredList);
        }
        else {
            filteredList = currentList;
        }

        this.setState({
            filteredData: filteredList
        });

    }

    //Home View
    render() {

        const recipes = this.state.filteredData;

        return (<div>
            <h1>Home Page</h1>

            Filter the Recipes based on input <br></br>

            <div>
                Username: {this.state.user.username} &nbsp;
                <button
                    type="button"
                    className="md-cell md-cell--1 md-btn md-btn--flat md-btn--text md-pointer--hover md-background--secondary md-background--secondary-hover md-inline-block"
                    onClick={() => this.logout()}>
                    Logout
                </button> <br /><br />
            </div>

            <input type="text" className="filterInput" placeholder="Filter recipes" onChange={this.handleSearchChange} />
            <ul>
                <RecipeList recipes={recipes} />
            </ul>

        </div>
        );
    }

}
