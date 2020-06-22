"use strict";

import React from 'react';

import RecipeForm from '../components/ChefComponent/RecipeForm';

import RecipeService from '../services/RecipeService';


export class RecipeFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if(this.props.history.location.pathname == '/add') {
            this.setState({
                loading: false,
                recipe: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state != undefined && this.props.location.state.recipe != undefined) {
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
        if(this.state.recipe == undefined) {
            RecipeService.createRecipe(recipe).then((data) => {
                this.props.history.push('/chef');
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating recipe'}));
            });
        } else {
            RecipeService.updateRecipe(recipe).then((data) => {
                this.props.history.goBack();
            }).catch((e) => {
                console.error(e);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating recipe'}));
            });
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<RecipeForm recipe={this.state.recipe} onSubmit={(recipe) => this.updateRecipe(recipe)} error={this.state.error} />);
    }
}
