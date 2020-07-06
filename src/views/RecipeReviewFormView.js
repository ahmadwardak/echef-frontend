import React from "react"
import RecipeReviewForm from '../components/RecipeReviewComponent/RecipeReviewForm';
import UserService from '../services/UserService';

export class RecipeReviewFormView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    addReview(review) {

    }

    render() {
        return (
            <RecipeReviewForm onSubmit={(review) => this.addReview(review)} error={this.state.error} />
        );
    }

}
