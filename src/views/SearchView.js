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
            data: [{"Title": "Something", "Difficulty": "Easy" }],
            filteredData: [],
            loading: false,
            Title: "",
            Difficulty: ""
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
        let nameVal = event.target.name
        let val = event.target.value

        this.setState({
            [nameVal]: val

        })


    }


    //Home View
    render() {
        const recipes = this.state.data.filter(recipe => {
            console.log("This is a recipe", recipe)
            return(
                recipe["Title"].includes(this.state.Title)
                && recipe["Difficulty"].includes(this.state.Difficulty)
            )
        })
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (<div>
            <div className="bigCol">
                <h2>Filter the Recipes based on input</h2> <br></br>
                <input
                    type="text" className="filterInput" name="Title"
                    placeholder="Filter recipes" onChange={this.handleSearchChange}
                />

                <select onChange={this.handleSearchChange} name="Difficulty">
                    <option value="">Any Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Hard">Hard</option>
                </select>
                <p>Categories goes here</p>
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
