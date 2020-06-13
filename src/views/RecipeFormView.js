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
        }
    }

    /*async updateRecipe(recipe) {
        if(this.state.recipe == undefined) {
            try {
                let ret = await RecipeService.create(recipe);
                this.props.history.push('/');
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating movie'}));
            }
        } 
    }*/

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<RecipeForm recipe={this.state.recipe} onSubmit={(recipe) => this.updateRecipe(recipe)} error={this.state.error} />);
    }
}
