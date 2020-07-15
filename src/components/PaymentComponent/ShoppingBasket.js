import React, { useState, useEffect } from 'react';
import './Payment.css';
import BasketItem from './BasketItem';
import RecipeService from '../../services/RecipeService';
import CartIcon from '../../Assets/empty-cart.png'
import {  Button } from 'react-bootstrap';

const ShoppingBasket = ({shoppingCart,updateCart})=>{
    console.log(shoppingCart);
    function handleDeleion(ingredientID, ingredientBrand, recipeID){
        var newCart= shoppingCart;
        var recipe= newCart.cartItems.find(rec=>  recipeID === rec.recipeID);
        var ingredientIndex = recipe.recipeIngredients.findIndex(ing=> ing.ingredientID === ingredientID && ing.ingredientBrand === ingredientBrand);
        recipe.recipeIngredients.splice(ingredientIndex,1);
        updateCart(newCart);
    }
    return(
       <div className="shoppingBasket">
           <div>
               <h4 className='whiteText'>Shopping Basket</h4>
            </div>
            {shoppingCart ? 
            <div className="fullBasket">
                <div className='itemsBox scrollable'>
                {shoppingCart.cartItems.map(recipe=>
                    <RecipeSection key={recipe.recipeID} recipe={recipe} handleDeleion={handleDeleion}/>
                )}
            </div>
            <div className="totalPrice">
                <ul className="totalPriceList">
                    <li><span className="whiteFont boldFont">Total</span> <span className="whiteFont boldFont">{shoppingCart.totalPrice} €</span></li>
                </ul>
            </div> 
            </div>
            :
            <div className="emptyCart">
                <h6>There is nothing in your cart. Proceed to check out our recipes and order all the ingredients you need.</h6>
                <img src={CartIcon}/>
                <Button variant="btn btn-success btn-block" href="/#" type="button">
                    Go to home page
                </Button>
                <Button variant="btn btn-success btn-block" href="/#/search" type="button">
                    Customize your search
                </Button>
            </div>
            }
            
       </div> 
    )
}

const RecipeSection = ({recipe,handleDeleion})=>{
    const[recipeName,setRecipeName]=useState('');
    RecipeService.getRecipeName(recipe.recipeID).then((data)=>{
        setRecipeName(data.title);
    });
    function deleteFromCart(ingredienID, ingredientBrand){
        handleDeleion(ingredienID,ingredientBrand,recipe.recipeID);
    }
    return(
        
        <div>
            <div className='greenBox'><p>recipe: {recipeName}</p></div>
            {recipe.recipeIngredients.map(
                function(ing,key){
                    return <BasketItem key={key} item={ing} DeleteFromCart={deleteFromCart}/>
                }
            )}
        </div>
        

    )
    

}

export default ShoppingBasket