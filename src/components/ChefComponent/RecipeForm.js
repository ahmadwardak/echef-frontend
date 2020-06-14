import React from "react";
import TextField from '@material-ui/core/TextField';
import { Card, Button, FontIcon } from 'react-md';
import { withRouter } from 'react-router-dom';
import Categories from '../Categories';
import Ingredient from '../RecipeComponent/Ingredient';
import IngredientsService from "../../services/IngredientsService";
import '../RecipeComponent/Recipe.css';
import IngredientListRow from './IngredientListRow';

const style = { maxWidth: 1500};

class RecipeForm extends React.Component{

    constructor(props){
        super(props);

        if(this.props.recipe != undefined){
            this.state = {
                recipeName : props.recipe.recipeName,
                recipeSteps: props.recipe.recipeSteps,
                recipeServingSize: props.recipe.recipeServingSize,
                ingredients: props.recipe.ingredients,
                loading: true
            };
        } else {
            this.state ={
                recipeName : '',
                recipeSteps: '',
                recipeServingSize: '',
                ingredients: [],
                loading: false
            };
        }

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSteps = this.handleChangeSteps.bind(this);
        this.handleChangeServingSize = this.handleChangeServingSize.bind(this);
    }

    handleChangeName(value){
        this.setState(Object.assign({}, this.state, {recipeName: value}));
    }

    handleChangeSteps(value){
        this.setState(Object.assign({}, this.state, {recipeSteps: value}));
    }
    
    handleChangeServingSize(value){
        this.setState(Object.assign({}, this.state, {recipeServingSize: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let recipe = this.props.recipe;
        if(recipe == undefined) {
            recipe = {};
        }

        recipe.recipeName = this.state.recipeName;
        recipe.recipeSteps = this.state.recipeSteps;
        recipe.recipeServingSize = this.state.recipeServingSize;

        this.props.onSubmit(recipe);
    }

    render(){
        return (
            <Card style={style} className="md-block-centered">
                <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                <TextField  
                    label="Recipe Name"
                    id="RecipeName"
                    type="text"
                    className="md-row"
                    required={true}
                    value={this.state.recipeName}
                    onChange={this.handleChangeName}
                    errortext="Recipe Name is required"
                    variant="outlined" />
                <TextField  
                    label="Recipe Steps"
                    id="RecipeSteps"
                    type="text"
                    className="md-row"
                    required={true}
                    value={this.state.recipeSteps}
                    onChange={this.handleChangeSteps}
                    errortext="Recipe Steps is required"
                    variant="outlined" />
                <TextField  
                    label="Serving Size"
                    id="ServingSize"
                    type="number"
                    className="md-row"
                    required={false}
                    value={this.state.recipeServingSize}
                    onChange={this.handleChangeServingSize}
                    errortext="Serving Size is required"
                    variant="outlined" />
                <Categories />
                <IngredientListRow ingredients={this.state.ingredients}/>
                <Button id="submit" type="submit"
                    disabled={this.state.recipeName == undefined || this.state.recipeName == '' || this.state.recipeSteps == undefined || this.state.recipeSteps == '' || this.state.recipeServingSize == undefined || this.state.recipeServingSize == ''}
                    raised primary className="md-cell md-cell--2">Publish</Button>
                </form>
            </Card>
        );
    }
}

export default RecipeForm;