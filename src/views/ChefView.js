import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { ChefViewList } from '../components/ChefComponent/ChefViewList';
import UserService from '../services/UserService'

export class ChefView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
        }
        this.createRecipe = this.createRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
    };
    // Normal React component Lifecycle
    componentWillMount() {
        this.setState({
            loading: true
        });

        let chefID = UserService.getCurrentUser()._id;
        RecipeService.getRecipesByChefID(chefID).then((data) => {
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

    deleteRecipe(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });
        RecipeService.deleteRecipe(id).then((message) => {

            let recipeIndex = this.state.data.map(recipe => recipe['_id']).indexOf(id);
            let recipes = this.state.data;
            recipes.splice(recipeIndex, 1);
            this.setState({
               data: [...recipes],
               loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        
        return (<div>
            <h1>My recipes</h1>
            <button onClick={this.createRecipe}>Create a new recipe</button>
            <ul>
                <ChefViewList recipes={this.state.data} onDelete={(id)=>this.deleteRecipe(id)}/>
            </ul>

        </div>
        );
    }

}
