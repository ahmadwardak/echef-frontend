import React, { useState, useEffect } from 'react';
import './Recipe.css';
import '../../App.css';
import Ingredient from './Ingredient.js'
import {  Button } from 'react-bootstrap';


const IngredientCustomizer = ({servingSize, ingredientsNeeded, addToShoppingCart})=>{
    const[totalPrice, setTotalPrice]=useState(0.0);
    const[ServingSize,setServingSize]=useState(servingSize);
    const[buttonEnabled, setButtonEnabled]=useState(false);
    
    var initialItems=[];
        ingredientsNeeded.map(ing=>{
            initialItems.push({
                id:ing.ingredientID, 
                amount:ing.ingredientQuantity, 
                price:0, 
                brand:ing.ingredientBrand,
                basePrice:0,
                baseAmount:ing.ingredientQuantity,
                isActive:false
            });
        });
    const[cartItems, setCartItems]=useState(initialItems);
    
    
    function changeServingSize(sSize){
        var newServingSize = sSize.target.value;
        console.log("newservs",newServingSize);
        setServingSize(newServingSize);
        cartItems.forEach(element=>{
            var newPrice= (element.basePrice * newServingSize )/servingSize;
            newPrice= Math.round(newPrice*100)/100;
            var newAmount= (newServingSize *element.baseAmount)/servingSize;
            element.price=newPrice;
            element.amount=newAmount;
        });
        calculateTotalPrice();
    }
    function addToCart(){
        var finalItems=[];
        cartItems.map(item=>{
            if(item.price!=0){
                finalItems.push({
                    ingredientID:item.id,
                    ingredientQuantity:item.amount,
                    ingredientBrand:item.brand,
                    price:item.price
                });
            }
        });
        addToShoppingCart(finalItems, totalPrice);
    }
    function calculateTotalPrice(){
        var total = 0.0;
        var newItems= cartItems;
        newItems.forEach(item =>{
            total = parseFloat(total) + parseFloat(item.price);
        });
        console.log("total", total);
        setTotalPrice(Math.round(total*100)/100);
    }
    function shoppingCartHandler(value,id,type){
      
        if(type=="amount"){
            handleIngredientAmount(value,id);
        }
        else if(type=="brand"){
            handleIngredientBrand(value,id);
        }
        else if(type=="price"){
            handleIngredientPrice(value,id);
            calculateTotalPrice();
        }
        else if(type=="basePrice"){
            handleIngredientBasePrice(value,id);
        }
        else if(type=="isActive"){
            handleIngredientActivation(value,id);
        }

        
    }
    function handleIngredientAmount(value, id){
        var newItems= cartItems;
        var itemIndex = newItems.findIndex(it => it.id==id);
        newItems[itemIndex].amount = parseInt(value);
        setCartItems(newItems);
    }
    function handleIngredientBrand(value,id){
        var newItems= cartItems;
        var itemIndex = newItems.findIndex(it => it.id==id);
        newItems[itemIndex].brand = value;
        setCartItems(newItems);
    }

    function handleIngredientPrice(value,id){
        var newItems= cartItems;
        var itemIndex = newItems.findIndex(it => it.id==id);
        newItems[itemIndex].price = value;
        setCartItems(newItems);
    }

    function handleIngredientBasePrice(value,id){
        var newItems= cartItems;
        var itemIndex = newItems.findIndex(it => it.id==id);
        newItems[itemIndex].basePrice = value;
        setCartItems(newItems);
    }
    function handleIngredientActivation(value,id){
        var newItems= cartItems;
        var itemIndex = newItems.findIndex(it => it.id==id);
        newItems[itemIndex].isActive = value;
        setCartItems(newItems);
        handleButton();
    }
    function handleButton(){
        var isEnabled=false;
        cartItems.forEach(item=>{
            if(item.isActive==true)
                isEnabled=true;
        });
        setButtonEnabled(isEnabled);
    }
    function preventKeyDown(event){
        event.preventDefault();
    }
    return(
       <div className='ingredientBox'>
           <div className='servingSizeDiv'>
                <h4 className='whiteFont bigCol'>For how many people you are cooking?</h4>
                <input type="number" className="servingSizeBox" step="1" min="2" defaultValue={ServingSize} onChange={changeServingSize} onKeyDown={preventKeyDown}></input>
           </div>
           <hr className='whiteFont'/>
           <div className='ingredientChanger'>
            <h5 className="whiteFont boldFont">Ingredients needed for {ServingSize} people:</h5>
            <div className="ScrollableContent">
                { ingredientsNeeded.map(ing => <Ingredient id={ing.ingredientID}  key={ing.ingredientID} cartHandler={shoppingCartHandler} ingredient={ing} servingSize={ServingSize/2}/> )}
            </div>
            <div className="totalPrice">
                <ul className="totalPriceList">
                    <li><span className="whiteFont boldFont">Total</span> <span className="whiteFont boldFont">{totalPrice} €</span></li>
                </ul>
            </div>
            
           </div>
           <div className="d-flex justify-content-center">
                <Button className="btn btn-success btn-block" onClick={addToCart} type="submit" disabled={!buttonEnabled}>
                            Order
                    </Button>
           </div>
           
       </div> 
    )
}

export default IngredientCustomizer