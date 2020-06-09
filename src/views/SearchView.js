import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { RecipeList } from '../components/RecipeList';
import Categories from "../components/Categories";

export class SearchView extends React.Component {

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
        //Connects the onChange event to the function
        this.handleSearchChange = this.handleSearchChange.bind(this);
    };
    // Normal React component Lifecycle
    componentWillMount() {
        this.setState({
            loading: true
        });

        RecipeService.getAll().then((data) => {
            this.setState({
                data: [...data],
                filteredData: [...data],
                loading: false
            })
        }).catch((e) => {
            console.error(e);
        });
    }
    // Handles the filter search
    handleSearchChange(event) {
        event.preventDefault()

        let currentList = this.state.data
        let filteredList = []
        //console.log("Current values: ",currentList)

        let val = event.target.value
        if (val !== "") {
            filteredList = currentList.filter(recipe => recipe.title.includes(val))
            console.log("Filtered values: ", filteredList)
        }
        else {
            filteredList = currentList
        }

        this.setState({
            filteredData: filteredList
        })

    }


    //Home View
    render() {
        const recipes = this.state.filteredData
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (<div>
            <div className="bigCol">
            <h2>Filter the Recipes based on input</h2> <br></br>
            <input type="text" className="filterInput" placeholder="Filter recipes" onChange={this.handleSearchChange} />
            <select>
                <option>Any Difficulty</option>
                <option>Easy</option>
                <option>Intermediate</option>
                <option>Hard</option>
            </select>
            <Categories/>
            </div>
            <div className="smallCol">
            <h1>Search Results</h1>
            <ul>
                <RecipeList recipes={recipes} />
            </ul>
            </div>
        </div>
        );
    }

}
