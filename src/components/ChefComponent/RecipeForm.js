import React from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Categories from '../Categories';
import CookingLevels from '../CookingLevels';
import '../RecipeComponent/Recipe.css';
import IngredientListRow from './IngredientListRow';
import UserService from '../../services/UserService';

const style = { maxWidth: 1500 };


class RecipeForm extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.recipe);
        if (this.props.recipe != undefined) {
            this.state = {
                title: props.recipe.title,
                description: props.recipe.description,
                servingSize: props.recipe.servingSize,
                category: props.recipe.category,
                difficulty: props.recipe.difficulty,
                recipeImageURL: props.recipe.recipeImageURL,
                createdByChef: props.recipe.createdByChef,
                ingredients: [{
                    ingredientID: props.recipe.ingredients.ingredientID,
                    //ingredientName: props.recipe.ingredients.ingredientName,
                    ingredientQuantity: props.recipe.ingredients.ingredientQuantity,
                    //ingredientUnit: props.recipe.ingredients.ingredientUnit,
                    ingredientBrand: props.recipe.ingredients.ingredientBrand,
                }],
                loading: true
            };
        } else {
            this.state = {
                title: '',
                description: '',
                servingSize: '',
                category: '',
                difficulty: '',
                recipeImageURL:'',
                createdByChef:'',
                ingredients: [{
                    ingredientID: '',
                    //ingredientName: '',
                    ingredientQuantity: '',
                    //ingredientUnit: '',
                    ingredientBrand: ''
                }],
                loading: false
            };
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.recipeImageURL = React.createRef();
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
    handleDifficultyChange(event) {
        this.setState(Object.assign({}, this.state, { difficulty: event.target.value }));
    }
    handleInputChange(event) {
        const name = event.target.name
        const value = event.target.value
        //const list = [...this.state]
        //console.log("received name", name, "value", value)

        this.setState(
            { [name]: value }
        )
    }
    handleIngredientChange(event, index) {
        const name = event.target.name
        const value = event.target.value
        //console.log("Received event name", name, "value", value, "index", index)
        let ingrList = this.state.ingredients
        ingrList[index][name] = value
        //console.log("ingrList", ingrList)
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
                    ingredientID: '',
                    //ingredientName: '',
                    ingredientQuantity: '',
                    //ingredientUnit: '',
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
        recipe.difficulty = this.state.difficulty;
        //console.log(this.recipeImageURL.current.files[0]);
        recipe.recipeImageURL = this.recipeImageURL.current.files[0];
        recipe.createdByChef = UserService.getCurrentUser()._id;
        recipe.ingredients = this.state.ingredients;

        this.props.onSubmit(recipe);
        //console.log("submitting",recipe)
    }

    render() {
        return (
            <div>
                <Card>
                    <Form onSubmit={this.handleSubmit}>
                        <Card.Header>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label>Recipe Title</Form.Label>
                            <Form.Control 
                                placeholder="recipe name here..." 
                                label="Recipe Title"
                                id="RecipeTitle"
                                type="text"
                                name="title"
                                required={true}
                                value={this.state.title}
                                onChange={(e) => { this.handleInputChange(e) }}
                                errortext="Recipe title is required"/>
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label>Select a Category</Form.Label>
                            <Categories category={this.state.category} onChange={this.handleCategoryChange} />
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label>Serving Size</Form.Label>
                            <Form.Control
                                label="Serving Size"
                                id="ServingSize"
                                type="number"
                                name="servingSize"
                                required={false}
                                value={this.state.servingSize}
                                onChange={(e) => { this.handleInputChange(e) }}
                                errortext="Serving Size is required"
                                variant="outlined" />
                            </Form.Group>

                            <Form.Group as={Col}>
                            <Form.Label>Cooking difficulty level</Form.Label>
                            <CookingLevels difficulty={this.state.difficulty} onChange={this.handleDifficultyChange}/>
                            </Form.Group>
                        </Form.Row>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group>
                            <Form.Label>Recipe Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="recipe description goes here..." 
                                label="Recipe Description"
                                id="RecipeDescription"
                                type="text"
                                name="description"
                                required={true}
                                value={this.state.description}
                                onChange={(e) => { this.handleInputChange(e) }}
                                errortext="Recipe title is required"/>
                            </Form.Group>
                            <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label>Select ingredients</Form.Label>
                                {this.state.ingredients.map((x, i) => {
                                    return (
                                        <Card style={style} className="md-block-centered">
                                            <div className="box">
                                                <IngredientListRow ingredients={this.state.ingredients} name="ingredientName" onChange={(e) => { this.handleIngredientChange(e, i) }} />
                                                <div className="btn-box">
                                                    {this.state.ingredients.length !== 1 && <button onClick={(e) => { this.handleRemoveClick(i) }}>-</button>}
                                                    {this.state.ingredients.length - 1 === i && <button onClick={this.handleAddClick}>+</button>}
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </Form.Group>
                            <Form.Group as={Col}>
                            <Form.File
                                className="position-relative"
                                accept=".jpg,.gif,.png,.jpeg"
                                ref={this.recipeImageURL}
                                name="recipeImageURL"
                                label="Add photo"
                                id="recipeImageURL"
                            />
                            </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Button variant="success" id="submit" type="submit"
                                disabled={this.state.title == undefined || this.state.title == '' || this.state.category == undefined || this.state.category == '' || this.state.servingSize == undefined || this.state.servingSize == '' || this.state.description == undefined || this.state.description == ''}
                                >Publish</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default RecipeForm;