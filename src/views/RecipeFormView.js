"use strict";

import React from 'react';
import RecipeForm from '../components/ChefComponent/RecipeForm';
import RecipeService from '../services/RecipeService';
import Banner from '../components/HeaderComponent/Banner';

export class RecipeFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.history.location.pathname == '/add') {
            this.setState({
                loading: false,
                recipe: undefined,
                error: undefined
            });
        }
        else if (this.props.location.state != undefined && this.props.location.state.recipe != undefined) {
            this.setState({
                loading: false,
                recipe: this.props.location.state.recipe,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;

            RecipeService.getRecipe(id).then((data) => {
                this.setState({
                    recipe: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    updateRecipe(recipe) {
        if (this.state.recipe == undefined) {
            RecipeService.createRecipe(recipe).catch((e) => window.confirm(e));
        } else {
            RecipeService.updateRecipe(recipe).catch((e) => window.confirm(e));
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <div>
                <Banner pageTitle={this.props.title} />
                <div className="content">
                    <RecipeForm recipe={this.state.recipe} onSubmit={(recipe) => this.updateRecipe(recipe)} error={this.state.error} />
                </div>
            </div>
        );
    }
}
