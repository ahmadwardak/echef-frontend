import React from 'react';
import RecipeService from '../services/RecipeService';
import ShoppingCartService from '../services/ShoppingCartService';
import UserService from '../services/UserService';
import IngredientCustomizer from '../components/RecipeComponent/IngredientCustomizer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';


import RecipeReviews from '../components/RecipeReviewComponent/RecipeReview';
import { Button } from 'react-bootstrap';
import { Shop } from 'react-bootstrap-icons';
import Rating from 'react-rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import Banner from '../components/HeaderComponent/Banner';

export class RecipeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recipe: [],
            user: UserService.getCurrentUser(),
            overallRating: ""
        }
        this.handleShoppingCart = this.handleShoppingCart.bind(this);
    };

    componentWillMount(props) {
        this.setState({
            loading: true
        });
        toast.configure();


        let id = this.props.match.params.id;
        RecipeService.getRecipe(id).then((data) => {
            console.log("test", data.recipe);
            this.setState({
                recipe: data.recipe,
                overallRating: data.OverallRating,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    goToAddRecipeReview() {
        window.location = '/#reviews/' + this.state.recipe._id;
    }

    handleShoppingCart(shoppingCart, totalPrice) {
        ShoppingCartService.getShoppingCartByUserId(this.state.user._id).then((data) => {
            if (data.length == 0) {
                var itemsWithID = [];
                itemsWithID.push({
                    recipeID: this.state.recipe._id,
                    recipeIngredients: shoppingCart
                });
                var finalCart = {
                    cartItems: itemsWithID,
                    customerID: this.state.user._id,
                    totalPrice: totalPrice
                }
                console.log("shopping cart", finalCart);
                ShoppingCartService.createShoppingCart(finalCart).then((data) => {
                    toast("Added to shopping cart", { type: 'success' });
                    window.location = '/#checkout';
                });
            }
            else {
                console.log("data not 0", data);
                console.log("shoping cart", shoppingCart);
                var existingCart = data[0];
                var existingItems = [];
                existingItems = existingCart.cartItems;
                console.log("items", existingItems);
                var existingRecipe = existingItems.find(element => element.recipeID == this.state.recipe._id);
                if (existingRecipe) {
                    var indexOfRecipe = existingItems.findIndex(element => element.recipeID == this.state.recipe._id);
                    console.log("recipe is there", existingRecipe);
                    shoppingCart.forEach(element => {
                        var existingItem = existingRecipe.recipeIngredients.find(item =>
                            item.ingredientID == element.ingredientID && item.ingredientBrand === element.ingredientBrand);
                        if (existingItem) {
                            console.log("element of cart", element);
                            var indexOfIngredient = existingRecipe.recipeIngredients.findIndex(item => item.ingredientID == element.ingredientID);
                            console.log("yes ingredient there");
                            console.log("old amount", existingItem.ingredientQuantity);
                            existingItem.ingredientQuantity = existingItem.ingredientQuantity + element.ingredientQuantity;
                            existingItem.price = Math.round((existingItem.price + element.price) * 100) / 100;
                            console.log("new amount", existingItem.ingredientQuantity);
                            console.log("new cartItem", existingItem);
                            console.log("new cartItems", existingItems);
                        }
                        else {
                            existingRecipe.recipeIngredients.push(element);
                            console.log("no ingredient is not there", existingRecipe);
                        }
                    });

                }
                else { //new recipe
                    existingItems.push({
                        recipeID: this.state.recipe._id,
                        recipeIngredients: shoppingCart
                    });
                    console.log("final cartt", existingCart);
                }
                existingCart.totalPrice = Math.round((existingCart.totalPrice + totalPrice) * 100) / 100;
                ShoppingCartService.updateShoppingCart(existingCart, this.state.user._id).then((data) => {
                    toast("Added to shopping cart", { type: 'success' });
                    window.location = '/#checkout';
                });
            }
        });
    }

    goToLogin() {
        window.location = '/#login';
        window.location.reload(false);
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (

            <div>
                <Banner pageTitle={this.state.recipe.title} recipeImageURL={this.state.recipe.recipeImageURL} />
                <div className="content">
                    <div className="container-fluid">
                        <Row className="pb-4">
                            <Col xs={12} md={6}>
                                <h3><span className="pr-3">{this.state.recipe.title}</span>
                                    <span>
                                        <Rating style={{ color: 'green', fontSize: '70%' }}
                                            emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
                                            fullSymbol={<FontAwesomeIcon icon={faStar} />}
                                            fractions={2}
                                            initialRating={this.state.overallRating}
                                            readonly
                                        />
                                    </span>
                                </h3>
                                <p>{Math.round(this.state.overallRating * 10) / 10} out of 5</p>
                                <p>{this.state.recipe.description} </p>
                            </Col>
                            <Col xs={12} md={6}>
                                <IngredientCustomizer servingSize={2} ingredientsNeeded={this.state.recipe.ingredients} addToShoppingCart={this.handleShoppingCart} />
                            </Col>
                        </Row>

                        <Row className="pt-2" style={{ borderTop: '1px solid #ccc' }}>
                            <Col xs={12} md={12}>
                                <h3><FontAwesomeIcon icon={faComments} /> Customer Reviews </h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}>
                                <div className='row mb-2'>
                                    {UserService.getCurrentUser()._id ?

                                        <Button variant="primary" type="button"
                                            onClick={() => this.goToAddRecipeReview()}>
                                            Write a review
                                    </Button> :

                                        <Button className="btn btn-warning" onClick={this.goToLogin} type="button">
                                            Log In to write a Review
                                    </Button>
                                    }
                                </div>
                                <RecipeReviews recipeId={this.state.recipe._id} ></RecipeReviews>
                            </Col>
                        </Row>

                    </div>

                </div>
            </div>
        );
    }
}
