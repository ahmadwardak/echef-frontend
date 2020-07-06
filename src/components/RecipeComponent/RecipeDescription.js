import React from 'react';
import './Recipe.css';

const RecipeDescription = ({recipeTitle, recipeDescription})=>{
    return(
       <div className='recipeDescriptionBack'>
           <h1>Recipe</h1>
           <p>{recipeDescription}</p>
           <p>{recipeDescription}</p>
           <p>{recipeDescription}</p>
       </div> 
    )
}

export default RecipeDescription