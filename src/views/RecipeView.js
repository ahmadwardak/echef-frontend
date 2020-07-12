import React from 'react';
import RecipeService from '../services/RecipeService';
import ShoppingCartService from '../services/ShoppingCartService';
import UserService from '../services/UserService';
import RecipeDescription from '../components/RecipeComponent/RecipeDescription'
import IngredientCustomizer from '../components/RecipeComponent/IngredientCustomizer'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {toast} from 'react-toastify';


import RecipeReviews from '../components/RecipeReviewComponent/RecipeReview';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faComments } from "@fortawesome/free-solid-svg-icons";
import { Shop } from 'react-bootstrap-icons';


export class RecipeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recipe: [],
            user: UserService.getCurrentUser()
        }
        this.handleShoppingCart=this.handleShoppingCart.bind(this);
    };

    componentWillMount(props) {
        this.setState({
            loading: true
        });
        toast.configure();


        let id = this.props.match.params.id;
        RecipeService.getRecipe(id).then((data) => {
            this.setState({
                recipe: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    goToAddRecipeReview() {
        window.location = '/#reviews/' + this.state.recipe._id;
    }

    handleShoppingCart(shoppingCart, totalPrice){
        ShoppingCartService.getShoppingCartByUserId(this.state.user._id).then((data)=>{
            if(data.length==0){
                var itemsWithID=[];
                itemsWithID.push({
                    recipeID:this.state.recipe._id,
                    recipeIngredients:shoppingCart
                });
                var finalCart = {
                    cartItems:itemsWithID,
                    customerID: this.state.user._id,
                    totalPrice: totalPrice
                }
                console.log("shopping cart", finalCart);
                ShoppingCartService.createShoppingCart(finalCart).then((data)=>{
                    toast("Added to shopping cart",{type: 'success'});
                    window.location = '/#checkout';
                });
            }
            else{
                console.log("data not 0", data);

            }
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <div>
                <Row>
                    <Col>
                        <RecipeDescription recipeTitle={this.state.recipe.title} recipeDescription={this.state.recipe.description} />
                    </Col>
                    <Col>
                        <IngredientCustomizer servingSize={2} ingredientsNeeded={this.state.recipe.ingredients} addToShoppingCart={this.handleShoppingCart}/>
                    </Col>
                </Row>
                    

                <br />
                <br />
                <br />
                <div className="container">
                    {/* Recipe Review Section */}

                    <div className='row'>
                        <h3><FontAwesomeIcon icon={faComments} /> Customer Reviews <span style={{ color: 'red', fontSize: '40%' }}>Average Rating goes here (stars).....</span></h3>
                    </div>

                    <div className='row mb-2'>
                        <Button variant="primary" type="button"
                            onClick={() => this.goToAddRecipeReview()}>
                            Write a review
                    </Button>
                    </div>
                    <RecipeReviews recipeId={this.state.recipe._id} ></RecipeReviews>
                </div>

            </div>
        );
    }
}
