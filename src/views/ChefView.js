import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { ChefViewList } from '../components/ChefComponent/ChefViewList';

export class ChefView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
        }
        this.createRecipe = this.createRecipe.bind(this)
    };
    // Normal React component Lifecycle
    componentWillMount() {
        this.setState({
            loading: true
        });

        RecipeService.getAll().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            })
        }).catch((e) => {
            console.error(e);
        });
    }
    
    createRecipe(){

        alert("Recipe creation");
    }

    render() {
        
        return (<div>
            <h1>My recipes</h1>
            <button onClick={this.createRecipe}>Create a new recipe</button>
            <ul>
                <ChefViewList recipes={this.state.data} />
            </ul>

        </div>
        );
    }

}
