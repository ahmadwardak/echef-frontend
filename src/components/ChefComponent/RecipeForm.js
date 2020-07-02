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
                title : props.recipe.title,
                description: props.recipe.description,
                servingSize: props.recipe.servingSize,
                category: props.recipe.category,
                ingredients:[{
                    ingredientName: props.recipe.ingredients.ingredientName,
                    ingredientQuantity: props.recipe.ingredients.ingredientQuantity,
                    ingredientUnit: props.recipe.ingredients.ingredientUnit,
                    ingredientBrand: props.recipe.ingredients.ingredientBrand,
                }],
                loading: true
            };
        } else {
            this.state ={
                title : '',
                description: '',
                servingSize: '',
                category: '',
                ingredients: [{
                    ingredientName:'',
                    ingredientQuantity:'',
                    ingredientUnit:'',
                    ingredientBrand:''
                }],
                loading: false
            };
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeServingSize = this.handleChangeServingSize.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event){
        this.setState(Object.assign({}, this.state, {title: event.target.value}));
    }

    handleChangeDescription(event){
        this.setState(Object.assign({}, this.state, {description: event.target.value}));
    }
    
    handleChangeServingSize(event){
        this.setState(Object.assign({}, this.state, {servingSize: event.target.value}));
    }

    handleChangeCategory(event){
        this.setState(Object.assign({}, this.state, {category: event.target.value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let recipe = this.props.recipe;
        if(recipe == undefined) {
            recipe = {};
        }

        recipe.title = this.state.title;
        recipe.description = this.state.description;
        recipe.servingSize = this.state.servingSize;
        recipe.category = this.state.category;

        this.props.onSubmit(recipe);
    }

    render(){
        return (
            <Card style={style} className="md-block-centered">
                <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                <TextField  
                    label="Recipe Title"
                    id="RecipeTitle"
                    type="text"
                    className="md-row"
                    required={true}
                    value={this.state.title}
                    onChange={this.handleChangeTitle}
                    errortext="Recipe title is required"
                    variant="outlined" />
                <TextField  
                    label="Recipe Description"
                    id="RecipeDescription"
                    type="text"
                    className="md-row"
                    required={true}
                    value={this.state.description}
                    onChange={this.handleChangeDescription}
                    errortext="Recipe Description is required"
                    variant="outlined" />
                <TextField  
                    label="Serving Size"
                    id="ServingSize"
                    type="number"
                    className="md-row"
                    required={false}
                    value={this.state.servingSize}
                    onChange={this.handleChangeServingSize}
                    errortext="Serving Size is required"
                    variant="outlined" />
                <Categories category={this.state.category} onChange={this.handleChangeCategory}/>
                <IngredientListRow ingredients={this.state.ingredients}/>
                <Button id="submit" type="submit"
                    disabled={this.state.title == undefined || this.state.title == '' || this.state.servingSize == undefined || this.state.servingSize == '' || this.state.description == undefined || this.state.description == ''}
                    raised primary className="md-cell md-cell--2">Publish</Button>
                </form>
            </Card>
        );
    }
}

export default RecipeForm;