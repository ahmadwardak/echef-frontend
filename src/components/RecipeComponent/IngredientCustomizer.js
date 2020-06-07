import React from 'react';
import './Recipe.css';
import '../../App.css';
import Ingredient from './Ingredient.js'

const IngredientCustomizer = ({servingSize, ingredientsNeeded})=>{
    console.log("ingre needed", ingredientsNeeded);
    return(
       <div className='ingredientBox'>
           <div className='servingSizeDiv'>
                <h4 className='whiteFont bigCol'>For how many people you are cooking?</h4>
                <input className="servingSizeBox"></input>
           </div>
           <hr className='whiteFont'/>
           <div className='ingredientChanger'>
            <h5 className="whiteFont boldFont">Ingredients needed for {servingSize} people:</h5>
            <div className="ScrollableContent">
                { ingredientsNeeded.map(ing => <Ingredient ingredient={ing}/> )}
            </div>
            
           </div>
           
       </div> 
    )
}

export default IngredientCustomizer