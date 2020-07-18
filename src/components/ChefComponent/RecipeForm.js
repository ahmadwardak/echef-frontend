import React from "react";
import { Card, Form, ButtonGroup, Button, Row, Col, Alert } from "react-bootstrap";
import Categories from '../Categories';
import CookingLevels from '../CookingLevels';
import '../RecipeComponent/Recipe.css';
import IngredientListRow from './IngredientListRow';
import UserService from '../../services/UserService';
import IngredientsService from '../../services/IngredientsService';

const style = { maxWidth: 1500 };


class RecipeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            servingSize: '2',
            category: '',
            difficulty: '',
            recipeImageURL: '',
            createdByChef: '',
            ingredients: '',
            loading: false,
            showFileInput: true,
            enablePublish: false
        };


        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.recipeImageURL = React.createRef();
        this.publishButton = React.createRef();
        // Dynamic values
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleIngredientChange = this.handleIngredientChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);

        this.handleToggleChangeRecipeImage = this.handleToggleChangeRecipeImage.bind(this);
        this.handleChangeRecipeImage = this.handleChangeRecipeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }


    componentWillMount(props) {
        // console.log(this.props.recipe)
        if (this.props.recipe != undefined) {
            let recipe = this.props.recipe.recipe;
            //console.log(recipe)
            //If recipe is already defined then setting the values
            this.setState({
                title: recipe.title,
                description: recipe.description,
                servingSize: recipe.servingSize,
                category: recipe.category,
                difficulty: recipe.difficulty,
                recipeImageURL: recipe.recipeImageURL,
                createdByChef: recipe.createdByChef,
                ingredients: recipe.ingredients,
                loading: true,
                showFileInput: false,
                enablePublish: true
            });
        } else {
            // A blank ingredient for Ingredient Map (ingredient list row component)
            let ing = [{
                ingredientID: "",
                ingredientQuantity: '',
                ingredientBrand: ''
            }]
            this.setState({ ingredients: ing });
        }

    }

    handleChangeTitle(event) {
        this.setState(Object.assign({}, this.state, { title: event.target.value }));
    }
    handleCategoryChange(event) {
        // console.log(event.target.value);
        if (event.target.value === 'All Categories') { this.publishButton.disabled = true; } else { this.publishButton.disabled = false; }
        this.setState(Object.assign({}, this.state, { category: event.target.value }));
        this.validate();
    }
    handleDifficultyChange(event) {
        // console.log(event.target.value);
        if (event.target.value === 'Select a level') { this.publishButton.disabled = true; } else { this.publishButton.disabled = false; }
        this.setState(Object.assign({}, this.state, { difficulty: event.target.value }));
        this.validate();
    }

    handleChangeRecipeImage(selectorFiles) {
        this.setState(Object.assign({}, this.state, { recipeImageURL: selectorFiles }));
        this.publishButton.disabled = false;
        // console.log(selectorFiles[0]);
        this.validate();

    }
    handleInputChange(event) {
        const name = event.target.name
        const value = event.target.value
        //const list = [...this.state]
        //console.log("received name", name, "value", value)

        this.setState(
            { [name]: value }
        )
        if (event.target.value === '') { this.publishButton.disabled = true; }
        this.validate();
    }


    handleToggleChangeRecipeImage(event) {
        // console.log(event.target.checked);
        // console.log(this.recipeImageURL.current.files[0]);
        if (event.target.checked === true && this.recipeImageURL.current.files[0] === undefined) { this.publishButton.disabled = true; }
        else { this.publishButton.disabled = false; }

        this.setState({ showFileInput: event.target.checked });
        this.validate();

    }

    //Ingredient changes are handled 
    handleIngredientChange(event, index) {
        const name = event.target.name
        const value = event.target.value
        //console.log("Received event name", name, "value", value, "index", index)
        let ingrList = this.state.ingredients
        ingrList[index][name] = value
        //console.log("ingrList.....", ingrList)
        this.setState({
            ingredients: ingrList
            //ingredients.ingredientUnit:
        })
        this.validate();

    }

    //Selected Ingredient will be deleted
    handleRemoveClick(event, index) {
        event.preventDefault();
        const list = [...this.state.ingredients];
        //    console.log("this is index", index)
        //      console.log("The list", list)
        list.splice(index, 1);
        //        console.log("spliced list", list)
        this.setState({
            ingredients: list
        })
        this.validate();
    };

    //Adding a new ingredient row to the screen and to the Ingredients value
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
        );
        this.validate();
    };

    validate() {
        // console.log(this.state.recipeImageURL)
        // console.log('enablePublish', this.state.enablePublish)
        if (this.state.title == '' || this.state.category == '' || this.state.description == '' ||
            this.state.difficulty == '' || this.state.ingredients == '' || this.state.recipeImageURL == ''
            || this.state.ingredients == undefined) {
            this.setState({ enablePublish: false });
            this.publishButton.disabled = true;
        } else {
            this.setState({ enablePublish: true });
        }

    }

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
        if (this.state.showFileInput) {
            recipe.recipeImageURL = this.recipeImageURL.current.files[0];
        }
        recipe.createdByChef = UserService.getCurrentUser()._id;
        recipe.ingredients = this.state.ingredients;


        this.props.onSubmit(recipe);
        // console.log("submitting", recipe)
    }

    render() {
        return (
            <div>
                <Card>
                    <Form onSubmit={this.handleSubmit}>
                        <Card.Header>
                            <Row>
                                <Col xs={12} md={4}>
                                    <Form.Group>
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
                                            errortext="Recipe title is required" />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={2}>
                                    <Form.Group>
                                        <Form.Label>Serving Size</Form.Label>
                                        <Form.Control
                                            label="Serving Size"
                                            id="ServingSize"
                                            type="number"
                                            name="servingSize"
                                            required={false}
                                            min="2"
                                            value={this.state.servingSize}
                                            onChange={(e) => { this.handleInputChange(e) }}
                                            errortext="Serving Size is required"
                                            variant="outlined" />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group>
                                        <Form.Label>Category</Form.Label>
                                        <Categories category={this.state.category} onChange={this.handleCategoryChange} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={3}>
                                    <Form.Group>
                                        <Form.Label>Cooking difficulty level</Form.Label>
                                        <CookingLevels difficulty={this.state.difficulty} onChange={this.handleDifficultyChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={8}>
                                    <Form.Group>
                                        <Form.Label>Recipe Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="recipe description goes here..."
                                            label="Recipe Description"
                                            id="RecipeDescription"
                                            type="text"
                                            rows="6"
                                            name="description"
                                            required={true}
                                            value={this.state.description}
                                            onChange={(e) => { this.handleInputChange(e) }}
                                            errortext="Recipe title is required" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={4}>
                                    <Form.Group>
                                        {this.props.recipe === undefined ?
                                            <Form.Label id="recipeImageLabel">Recipe Image (Max 5MB file)</Form.Label>
                                            :
                                            <Form.Check id="checkboxChangeRecipeImage"
                                                style={{ marginBottom: '0.5rem' }} type="checkbox"
                                                onChange={this.handleToggleChangeRecipeImage}
                                                label='Update Recipe Image ? - (Max 5MB file)' />
                                        }
                                        <Form.File
                                            className="position-relative"
                                            accept=".jpg,.gif,.png,.jpeg"
                                            ref={this.recipeImageURL}
                                            onChange={(e) => this.handleChangeRecipeImage(e.target.files)}
                                            disabled={!this.state.showFileInput}
                                            name="recipeImageURL"
                                            id="recipeImageURL"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>

                                <Col xs={12} md={12}>
                                    <Form.Group>
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <Form.Label>Select ingredients</Form.Label>
                                            </Col>
                                        </Row>
                                        {/*Array of ingredients selected by providing an option to add and delete a row */}
                                        {this.state.ingredients.map((ing, i) => {
                                            return (
                                                <Card key={i} className="mb-1" style={{ backgroundColor: i % 2 ? '#d3e9d3' : '#eee' }}>
                                                    <Row className="p-2">
                                                        <Col className="pr-0" xs={2} md={2}>
                                                            <ButtonGroup className="mr-2">
                                                                {this.state.ingredients.length !== 1 && <Button onClick={(e) => { this.handleRemoveClick(e, i) }} variant="danger">-</Button>}
                                                                {this.state.ingredients.length - 1 === i && <Button onClick={this.handleAddClick} variant="success">+</Button>}
                                                            </ButtonGroup>
                                                        </Col>

                                                        <Col className="pl-0" xs={10} md={10}>
                                                            <IngredientListRow ingredient={ing} onChange={(e) => { this.handleIngredientChange(e, i) }} />
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            );
                                        })}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12}>
                                    <Button variant="success" id="submit" type="submit"
                                        ref={(button) => this.publishButton = button}
                                        disabled={!this.state.enablePublish}
                                    >Publish</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default RecipeForm;