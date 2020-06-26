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
            data: [{ "title": "If you see this, the DB is not connected", "difficulty": "Easy", "_id": "FooBar", "category":"All Categories" }],
            allTags: [],
            loading: false,
            title: "",
            difficulty: "",
            category: "All Categories"
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
            //console.log("Data received", data)
            this.setState({
                data: [...data],

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

        console.log("nameVal", nameVal)
        console.log("val", val)

        this.setState({
            [nameVal]: val

        })


    }


    //Home View
    render() {
        const recipes = this.state.data.filter(recipe => {
            console.log("This is a recipe", recipe["category"])
            if (this.state.category == "All Categories") {
                return (
                    recipe["title"].includes(this.state.title)
                    && recipe["difficulty"].includes(this.state.difficulty)
                   
                )
            }
            else{
                return (
                    recipe["title"].includes(this.state.title)
                    && recipe["difficulty"].includes(this.state.difficulty)
                    && recipe["category"] == this.state.category
                )
            }
        })
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (<div>
            <div>
                <h2>Filter the Recipes based on input</h2> <br></br>

                <input
                    type="text" className="filterInput" name="title"
                    placeholder="Filter recipes" onChange={this.handleSearchChange}
                />

                <select onChange={this.handleSearchChange} name="difficulty">
                    <option value="">Any Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Hard">Hard</option>
                </select>
                <Categories name="categories" onChange={this.handleSearchChange} />
                <p>Minimum amount of servings </p>
                <input
                    type="numeric" className="servingSize" name="servingSize" placeholder={2}
                    onChange={this.handleSearchChange}
                />
            </div>
            <div >
                <h1>Search Results</h1>
                <ul>
                    <RecipeList recipes={recipes} />
                </ul>
            </div>
        </div>
        );
    }

}
