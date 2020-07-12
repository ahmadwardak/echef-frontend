"use strict";
import React from 'react';
import RecipeService from '../services/RecipeService';
import IngredientsService from '../services/IngredientsService';
import RecipeDescription from '../components/RecipeComponent/RecipeDescription'
import IngredientCustomizer from '../components/RecipeComponent/IngredientCustomizer'



import RecipeReviews from '../components/RecipeReviewComponent/RecipeReview';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faComments, faStar } from "@fortawesome/free-solid-svg-icons";

import Rating from 'react-rating';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import Banner from '../components/HeaderComponent/Banner';

export class RecipeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recipe: [],
            overallRating: ""
        }
    };

    componentWillMount(props) {
        this.setState({
            loading: true
        });

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

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (

            <div>
                <Banner pageTitle={this.props.title} />
                <div className="content">
                    {console.log("I'm here")}
                    <div className='row'>
                        <RecipeDescription recipeTitle={this.state.recipe.title} recipeDescription={this.state.recipe.description} />
                        <IngredientCustomizer servingSize={2} ingredientsNeeded={this.state.recipe.ingredients} />
                    </div>

                    <br />
                    <br />
                    <br />
                    <div className="container">
                        {/* Recipe Review Section */}

                        <div className='row'>
                            <h3><FontAwesomeIcon icon={faComments} /> Customer Reviews <span><Rating style={{ color: 'green' }}
                                emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
                                fullSymbol={<FontAwesomeIcon icon={faStar} />}
                                fractions={2}
                                initialRating={this.state.overallRating}
                                readonly
                            /></span></h3>
                        </div>

                        <div className='row mb-2'>
                            <Button variant="primary" type="button"
                                onClick={() => this.goToAddRecipeReview()}>
                                Write a review
                    </Button>
                        </div>
                        <RecipeReviews recipeId={this.state.recipe._id} ></RecipeReviews>
                    </div>

                </div></div>
        );
    }
}
