import React from "react";
import TextField from '@material-ui/core/TextField';
import { Card, Button, FontIcon } from 'react-md';
import { withRouter } from 'react-router-dom';
import Categories from '../SharedComponents/Categories';
import Ingredient from '../RecipeComponent/Ingredient';
import IngredientsService from "../../services/IngredientsService";
import '../RecipeComponent/Recipe.css';
import IngredientListRow from './IngredientListRow';
import UserService from '../../services/UserService';

const style = { maxWidth: 1500 };


class RecipeForm extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.recipe != undefined) {
            this.state = {
                title: props.recipe.title,
                description: props.recipe.description,
                servingSize: props.recipe.servingSize,
                createdByChef: props.recipe.createdByChef,
                ingredients: [{
                    ingredientName: props.recipe.ingredients.ingredientName,
                    ingredientQuantity: props.recipe.ingredients.ingredientQuantity,
                    ingredientUnit: props.recipe.ingredients.ingredientUnit,
                    ingredientBrand: props.recipe.ingredients.ingredientBrand,
                }],
                category: props.recipe.category,
                loading: true
            };
        } else {
            this.state = {
                title: '',
                description: '',
                servingSize: '',
                createdByChef:'',
                ingredients: [{
                    ingredientName: '',
                    ingredientQuantity: '',
                    ingredientUnit: '',
                    ingredientBrand: ''
                }],
                category: '',
                loading: false
            };
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        // Dynamic values
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
        this.setState(Object.assign({}, this.state, { title: event.target.value }));
    }
    handleCategoryChange(event) {
        //console.log("category", event.target.value)
        this.setState(Object.assign({}, this.state, { category: event.target.value }));
    }
    handleInputChange(event) {
        const name = event.target.name
        const value = event.target.value
        //const list = [...this.state]
        console.log("received name", name, "value", value)

        this.setState(
            { [name]: value }
        )
    }
    handleIngredientChange(event, index) {
        const name = event.target.name
        const value = event.target.value
        console.log("Received event name", name, "value", value, "index", index)
        let ingrList = this.state.ingredients
        ingrList[index][name] = value
        console.log("ingrList", ingrList)
        this.setState({
            ingredients: ingrList
            //ingredients.ingredientUnit:
        })

    }

    handleRemoveClick(index) {
        const list = [...this.state.components];
        //    console.log("this is index", index)
        //      console.log("The list", list)
        list.splice(index, 1);
        //        console.log("spliced list", list)
        this.setState({
            components: list
        })
    };

    // handle click event of the Add button
    handleAddClick() {
        this.setState(
            {
                ingredients: [...this.state.ingredients,
                {
                    ingredientName: '',
                    ingredientQuantity: '',
                    ingredientUnit: '',
                    ingredientBrand: ''
                }
                ]
            }
        )
    };

    handleSubmit(event) {
        event.preventDefault();

        let recipe = this.props.recipe;
        if (recipe == undefined) {
            recipe = {};
        }

        recipe.title = this.state.title;
        recipe.description = this.state.description;
        recipe.servingSize = this.state.servingSize;
        recipe.category = this.state.category;
        recipe.createdByChef = UserService.getCurrentUser()._id;
        recipe.ingredients = this.state.ingredients;

        //this.props.onSubmit(recipe);
        console.log("submitting",recipe)
    }

    render() {
        return (
            <div className="Anythign">
                <h3> Hey hey</h3>
                <Card style={style} className="md-block-centered">
                    <Categories category={this.state.category} onChange={this.handleCategoryChange} />
                    <TextField
                        label="Recipe Title"
                        id="RecipeTitle"
                        type="text"
                        className="md-row"
                        name="title"
                        required={true}
                        value={this.state.title}
                        onChange={(e) => { this.handleInputChange(e) }}
                        errortext="Recipe title is required"
                        variant="outlined"
                    />
                    <TextField
                        label="Recipe Description"
                        id="RecipeDescription"
                        type="text"
                        name="description"
                        className="md-row"
                        required={true}
                        value={this.state.description}
                        onChange={(e) => { this.handleInputChange(e) }}
                        errortext="Recipe Description is required"
                        variant="outlined" />
                    <TextField
                        label="Serving Size"
                        id="ServingSize"
                        type="number"
                        name="servingSize"
                        className="md-row"
                        required={false}
                        value={this.state.servingSize}
                        onChange={(e) => { this.handleInputChange(e) }}
                        errortext="Serving Size is required"
                        variant="outlined" />
                        <select name="difficulty" onChange={this.handleInputChange}>
                            <option >Easy</option>
                            <option>Intermediate</option>
                            <option>Hard</option>
                        </select>
                    {this.state.ingredients.map((x, i) => {
                        return (
                            <Card style={style} className="md-block-centered">
                                <div className="box">
                                    <IngredientListRow ingredients={this.state.ingredients} name="ingredientName" onChange={(e) => { this.handleIngredientChange(e, i) }} />
                                    <div className="btn-box">
                                        {this.state.ingredients.length !== 1 && <button onClick={(e) => { this.handleRemoveClick(i) }}>Remove</button>}
                                        {this.state.ingredients.length - 1 === i && <button onClick={this.handleAddClick}>Add</button>}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                    <button onClick={this.handleSubmit}> submit</button>
                </Card >
                <div style={{ marginTop: 20 }}>{JSON.stringify(this.state)}</div>
            </div>
        );
    }
}

export default RecipeForm;