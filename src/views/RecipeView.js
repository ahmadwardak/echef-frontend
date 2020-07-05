"use strict";
import React from 'react';
import RecipeService from '../services/RecipeService';
import IngredientsService from '../services/IngredientsService';
import RecipeDescription from '../components/RecipeComponent/RecipeDescription'
import IngredientCustomizer from '../components/RecipeComponent/IngredientCustomizer'



export class RecipeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recipe: []
        }
    };
    

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;
        RecipeService.getRecipe(id).then((data) => {
            console.log("test", data);
            this.setState({
                recipe: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });    
    }


    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <div>
               { console.log("I'm here")}
                    <div className='row'>
                        <RecipeDescription recipeTitle={this.state.recipe.title} recipeDescription={this.state.recipe.description}/> 
                        <IngredientCustomizer servingSize={2} ingredientsNeeded={this.state.recipe.ingredients}/>
                    </div>
                    
            </div>
                   );
    }
}
