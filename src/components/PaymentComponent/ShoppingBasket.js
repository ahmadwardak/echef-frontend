import React, { useState, useEffect } from 'react';
import './Payment.css';
import BasketItem from './BasketItem';
import RecipeService from '../../services/RecipeService';
import CartIcon from '../../Assets/empty-cart.png'
import {  Button } from 'react-bootstrap';

const ShoppingBasket = ({shoppingCart,updateCart})=>{
    const [shoppingBasket,setShoppingBasket]=useState(shoppingCart==undefined||shoppingCart.cartItems.length==0?undefined:shoppingCart);
    function handleDeleion(ingredientID, ingredientBrand, recipeID){
        console.log("handle deletion",shoppingBasket);
        var newCart= shoppingBasket;
        var recipe= newCart.cartItems.find(rec=>  recipeID === rec.recipeID);
        var ingredientIndex = recipe.recipeIngredients.findIndex(ing=> ing.ingredientID === ingredientID && ing.ingredientBrand === ingredientBrand);
        newCart.totalPrice = newCart.totalPrice - recipe.recipeIngredients[ingredientIndex].price;
        recipe.recipeIngredients.splice(ingredientIndex,1);
        if(recipe.recipeIngredients.length==0){
            var recipeIndex = newCart.cartItems.findIndex(rec=>  recipeID === rec.recipeID);
            newCart.cartItems.splice(recipeIndex,1);
        }
        if(newCart.cartItems.length==0){
            setShoppingBasket(undefined);
        }
        updateCart(newCart);
    }
    return(
       <div className="shoppingBasket">
           <div>
               <h4 className='whiteText'>Shopping Basket</h4>
            </div>
            {shoppingBasket != undefined ? 
            <div className="fullBasket">
                <div className='itemsBox scrollable'>
                {shoppingBasket.cartItems.map(recipe=>
                    <RecipeSection key={recipe.recipeID} recipe={recipe} handleDeleion={handleDeleion}/>
                )}
            </div>
            <div className="totalPrice">
                <ul className="totalPriceList">
                    <li><span className="whiteFont boldFont">Items total</span> <span className="whiteFont boldFont">{Math.round(shoppingBasket.totalPrice*100)/100} €</span></li>
                </ul>
                <ul className="totalPriceList">
                    <li><span className="whiteFont boldFont">Shipping</span> <span className="whiteFont boldFont">{Math.round((shoppingBasket.totalPrice*0.2)*100)/100} €</span></li>
                </ul>
                <ul className="totalPriceList">
                    <li><span className="whiteFont boldFont">Total</span> <span className="whiteFont boldFont">{Math.round((shoppingBasket.totalPrice*1.2)*100)/100} €</span></li>
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
                <Button variant="btn btn-success btn-block" href="/#/orders" type="button">
                    Check  out your orders
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
                    return <BasketItem key={key} item={ing} DeleteFromCart={deleteFromCart} showDeleteButtton={true}/>
                }
            )}
        </div>
        

    )
    

}

export default ShoppingBasket