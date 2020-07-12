import React from "react"
import RecipeReviewForm from '../components/RecipeReviewComponent/RecipeReviewForm';
import UserService from '../services/UserService';
import Banner from '../components/HeaderComponent/Banner';

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
            <div>
                <Banner pageTitle={this.props.title} />
                <div className="content">
                    <RecipeReviewForm onSubmit={(review) => this.addReview(review)} error={this.state.error} /></div></div>
        );
    }

}
