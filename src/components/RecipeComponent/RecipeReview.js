import React, { Component } from "react";

import RecipeReviewService from '../services/RecipeReviewService';


export class RecipeReview extends Component {


    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        }
    };

    componentDidMount() {

        const reviews = RecipeReviewService.getReviews(this.props.recipeID);
        this.setState({ reviews });
    }


    render() {
        <div>
            {this.state.reviews.map(review => (
                <div
                    key={review.id}
                >{review.heading}</div>
            ))}
        </div>

    }
}