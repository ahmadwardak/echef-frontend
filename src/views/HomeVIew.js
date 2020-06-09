import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { RecipeList } from '../components/RecipeList';

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
            searchFilter: ""
        }
   
    };
    


    //Home View
    render() {
       
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (<div>
            <h1>Home Page</h1>
            </div>
        );
    }

}
