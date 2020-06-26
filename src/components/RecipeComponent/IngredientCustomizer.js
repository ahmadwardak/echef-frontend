import React, { useState } from 'react';
import './Recipe.css';
import '../../App.css';
import Ingredient from './Ingredient.js'

const IngredientCustomizer = ({servingSize, ingredientsNeeded})=>{
    const[totalPrice, setTotalPrice]=useState(0.0);
    const[ServingSize,setServingSize]=useState(servingSize);
    function changeTotalPrice(oldPrice, newPrice){
        
        var tmp = totalPrice; 
        //console.log("old price", tmp);
        tmp = tmp - parseFloat(oldPrice) + parseFloat(newPrice);
        //console.log("new price", tmp);
        setTotalPrice(tmp.toFixed(2));
    }
    function changeServingSize(sSize){
        console.log(sSize.target.value);
        setServingSize(sSize.target.value);
    }
    return(
       <div className='ingredientBox'>
           <div className='servingSizeDiv'>
                <h4 className='whiteFont bigCol'>For how many people you are cooking?</h4>
                <input className="servingSizeBox" defaultValue={ServingSize} onChange={changeServingSize}></input>
           </div>
           <hr className='whiteFont'/>
           <div className='ingredientChanger'>
            <h5 className="whiteFont boldFont">Ingredients needed for {ServingSize} people:</h5>
            <div className="ScrollableContent">
                { ingredientsNeeded.map(ing => <Ingredient ingredient={ing} priceHandler={changeTotalPrice} servingSize={ServingSize/2}/> )}
            </div>
            <div className="totalPrice">
                <ul class="totalPriceList">
                    <li><span className="whiteFont boldFont">Total</span> <span className="whiteFont boldFont">{totalPrice} €</span></li>
                </ul>
            </div>
           </div>
           
       </div> 
    )
}

export default IngredientCustomizer