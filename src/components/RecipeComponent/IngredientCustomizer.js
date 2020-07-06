import React, { useState, useEffect } from 'react';
import './Recipe.css';
import '../../App.css';
import Ingredient from './Ingredient.js'
import { Button } from 'react-bootstrap';


const IngredientCustomizer = ({ servingSize, ingredientsNeeded }) => {
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [ServingSize, setServingSize] = useState(servingSize);

    var initialItems = [];
    ingredientsNeeded.map(ing => {
        initialItems.push({ id: ing.ingredientID, name: '', amount: ing.ingredientQuantity, price: 0, brand: ing.ingredientBrand, basePrice: 0 });
    });
    const [cartItems, setCartItems] = useState(initialItems);


    function changeServingSize(sSize) {
        var newServingSize = sSize.target.value;
        console.log("newservs", newServingSize);
        setServingSize(newServingSize);
        cartItems.forEach(element => {
            var newPrice = (element.basePrice * newServingSize) / servingSize;
            newPrice = Math.round(newPrice * 100) / 100;
            element.price = newPrice;
        });
        calculateTotalPrice();
    }
    function addToCart() {

    }
    function calculateTotalPrice() {
        var total = 0.0;
        var newItems = cartItems;
        newItems.forEach(item => {
            total = parseFloat(total) + parseFloat(item.price);
        });
        console.log("total", total);
        setTotalPrice(Math.round(total * 100) / 100);
    }
    function shoppingCartHandler(event, id, type) {
        if (type == "name") {
            handleIngredientName(event, id);
        }
        else if (type == "amount") {
            handleIngredientAmount(event, id);
        }
        else if (type == "brand") {
            handleIngredientBrand(event, id);
        }
        else if (type == "price") {
            handleIngredientPrice(event, id);
            calculateTotalPrice();
        }
        else if (type == "basePrice") {
            handleIngredientBasePrice(event, id);
        }


    }
    function handleIngredientAmount(event, id) {
        var newItems = cartItems;
        var itemIndex = newItems.findIndex(it => it.id == id);
        newItems[itemIndex].amount = parseInt(event.target.value);
        setCartItems(newItems);
        console.log("amount handler:", cartItems);
    }
    function handleIngredientName(name, id) {
        var newItems = cartItems;
        var itemIndex = newItems.findIndex(it => it.id == id);
        newItems[itemIndex].name = name;
        setCartItems(newItems);
        console.log("name handler:", cartItems);
    }
    function handleIngredientBrand(event, id) {
        var newItems = cartItems;
        var itemIndex = newItems.findIndex(it => it.id == id);
        console.log("event brand", event);
        newItems[itemIndex].brand = event.target.value;
        setCartItems(newItems);
        console.log("brand handler:", cartItems);
    }

    function handleIngredientPrice(event, id) {
        var newItems = cartItems;
        var itemIndex = newItems.findIndex(it => it.id == id);
        newItems[itemIndex].price = event;
        setCartItems(newItems);
        console.log("price handler:", cartItems);
    }

    function handleIngredientBasePrice(event, id) {
        var newItems = cartItems;
        var itemIndex = newItems.findIndex(it => it.id == id);
        newItems[itemIndex].basePrice = event;
        setCartItems(newItems);
        console.log("base price handler:", cartItems);
    }
    function preventKeyDown(event) {
        event.preventDefault();
    }
    return (
        <div className='ingredientBox'>
            <div className='servingSizeDiv'>
                <h4 className='whiteFont bigCol'>For how many people you are cooking?</h4>
                <input type="number" className="servingSizeBox" step="1" min="2" defaultValue={ServingSize} onChange={changeServingSize} onKeyDown={preventKeyDown}></input>
            </div>
            <hr className='whiteFont' />
            <div className='ingredientChanger'>
                <h5 className="whiteFont boldFont">Ingredients needed for {ServingSize} people:</h5>
                <div className="ScrollableContent">
                    {ingredientsNeeded.map(ing => <Ingredient id={ing.ingredientID} cartHandler={shoppingCartHandler} ingredient={ing} servingSize={ServingSize / 2} />)}
                </div>
                <div className="totalPrice">
                    <ul className="totalPriceList">
                        <li><span className="whiteFont boldFont">Total</span> <span className="whiteFont boldFont">{totalPrice} €</span></li>
                    </ul>
                </div>

            </div>
            <div className="d-flex justify-content-center">
                <Button className="btn btn-success" onClick={addToCart} type="submit">
                    Order
                    </Button>
            </div>

        </div>
    )
}

export default IngredientCustomizer