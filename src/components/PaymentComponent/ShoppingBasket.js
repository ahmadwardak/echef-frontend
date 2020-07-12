import React, { useState, useEffect } from 'react';
import './Payment.css';
import BasketItem from './BasketItem';



const ShoppingBasket = ({shoppingCart})=>{
    console.log(shoppingCart)
    return(
       <div className="shoppingBasket">
           <div>
               <h4 className='whiteText'>Shopping Basket</h4>
            </div>
            <div className='itemsBox'>
                {shoppingCart.cartItems[0].recipeIngredients.map(item=>
                    <BasketItem item={item}/>
                )}
            </div>
            <div className="totalPrice">
                <ul className="totalPriceList">
                    <li><span className="whiteFont boldFont">Total</span> <span className="whiteFont boldFont">{shoppingCart.totalPrice} €</span></li>
                </ul>
            </div> 
       </div> 
    )
}

export default ShoppingBasket