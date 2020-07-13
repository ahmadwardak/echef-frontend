import React, { useState, useEffect } from 'react';
import './Payment.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GroceryIcon from '../../Assets/grocery.png';
import {  Button } from 'react-bootstrap';
import IngredientsService from '../../services/IngredientsService';

const BasketItem = ({item,DeleteFromCart})=>{ 
    const[title,setTitle]=useState('');
    const[parameter,setParameter]=useState('');


    function DeleteItemFromCart(){
        DeleteFromCart(item.ingredientID, item.ingredientBrand);
    }
        IngredientsService.getIngredient(item.ingredientID).then((data) => {
            setTitle(data.name);
            setParameter(data.ingredientUnit);
        }).catch((e) => {
            console.error(e);
        }); 
    return(
       <div className='itemSection'>
           <Row>
             <Col md={4}>
                <img src={GroceryIcon}/>
             </Col>
             <Col md={8}>
                 <div>
                    <h6 className='itemRow'>{title}</h6>
                    <Row className='itemRow'>
                        <Col md={4}>
                            <span>From: </span>
                        </Col>
                        <Col md={8}>
                            <h5 className='greenText'>{item.ingredientBrand}</h5>
                        </Col>
                    </Row>
                    <Row className='itemRow'>
                        <Col md={4}>
                            <span>Quantity: </span>
                        </Col>
                        <Col md={8}>
                            <input disabled={true} className='amountBox' type='number' defaultValue={item.ingredientQuantity}></input>
                        </Col>
                    </Row>
                    <Row className='itemRow'>
                        <Col md={4}>
                            <span>Price: </span>
                        </Col>
                        <Col md={8}>
                            <p>{item.price} €</p>
                        </Col>
                    </Row>
                    <Row className='itemRow'>
                        <Col>
                            <Button variant="outline-success" onClick={DeleteItemFromCart} type="button">
                                Delete from basket
                            </Button>
                        </Col>                     
                    </Row>
                    
                 </div>
             </Col>
           </Row>
       </div> 
    )
}


export default BasketItem