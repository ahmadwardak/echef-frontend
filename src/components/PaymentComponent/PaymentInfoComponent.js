import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import StripeCheckout from 'react-stripe-checkout';
import OrderService from '../../services/OrderService';
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css';



const PaymentInfo = ({ user, shoppingCart, orderCompleted }) => {
    toast.configure();
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        User: user._id,
        FirstName: '',
        LastName: '',
        AddressLine1: '',
        AddressLine2: '',
        City: '',
        Country: '',
        Region: '',
        Zipcode: ''
    });





    function selectCountry(val) {
        setCountry(val);
        checkShowButton();
    }
    function selectRegion(val) {
        // console.log("KKKKK");
        setRegion(val);
        checkShowButton();
    }
    function setUserDetails(event) {
        var details = orderDetails;
        var name = event.target.name;
        if (name === 'FirstName') {
            details.FirstName = event.target.value;
        }
        else if (name === 'LastName') {
            details.LastName = event.target.value;
        }
        else if (name === 'AddressLine1') {
            details.AddressLine1 = event.target.value;
        }
        else if (name === 'AddressLine2') {
            details.AddressLine2 = event.target.value;
        }
        else if (name === 'City') {
            details.City = event.target.value;
        }
        else if (name === 'Zipcode') {
            details.Zipcode = event.target.value;
        }
        setOrderDetails(details);
        checkShowButton();

    }
    function checkShowButton() {
        var result = false;
        if (
            orderDetails.FirstName != '' &&
            orderDetails.LastName != '' &&
            orderDetails.AddressLine1 != '' &&
            orderDetails.AddressLine2 != '' &&
            orderDetails.City != '' &&
            orderDetails.Zipcode != '' &&
            country != '') {
            result = true;
        }
        // console.log("show button?",result);
        // console.log("order details",orderDetails);
        // console.log("Country and region", country, region);
        setShowButton(result);
    }

    function handleToken(token) {
        let finalDetails = orderDetails;
        finalDetails.Country = country;
        finalDetails.Region = region;
        setOrderDetails(finalDetails);
        var items = [];
        if (shoppingCart != undefined && shoppingCart.cartItems.length > 0) {
            shoppingCart.cartItems.map(recipe => {
                var ings = [];
                recipe.recipeIngredients.map(ingredient => {
                    ings.push({
                        ingredientID: ingredient.ingredientID,
                        ingredientQuantity: ingredient.ingredientQuantity,
                        ingredientBrand: ingredient.ingredientBrand,
                        price: ingredient.price
                    });
                });
                items.push({
                    recipeID: recipe.recipeID,
                    recipeIngredients: ings
                });
            });
        }
        var cart = {
            cartItems: items,
            totalPrice: shoppingCart.totalPrice,
            shipmentCost: Math.round((shoppingCart.totalPrice * 0.2) * 100) / 100
        };
        OrderService.createOrder({
            cart,
            orderDetails,
            token
        }).then((data) => {
            // console.log('response:', data);
            if (data.status == 'success') {
                toast('You paid successfully!', { type: 'success' });
                orderCompleted();
            }
            else {
                toast('Something went wrong!', { type: 'error' });
            }
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div className={shoppingCart ? "" : "disabledSection"}>
            <div className='shipmentDiv'>
                <h4 className='paymentTitle'>Shipping Information</h4>
                <div className="inputGroup">
                    <Row>
                        <Col>
                            <input className='formStyle' type="text" defaultValue={orderDetails.FirstName} name='FirstName' onChange={setUserDetails} placeholder='First Name*' />
                        </Col>
                        <Col>
                            <input className='formStyle' type="text" defaultValue={orderDetails.LastName} name='LastName' onChange={setUserDetails} placeholder="Last Name*" />
                        </Col>
                    </Row>
                </div>
                <div className="inputGroup">
                    <input className='formStyle' type="text" defaultValue={user.shippingAddress} name='AddressLine1' onChange={setUserDetails} placeholder="Address*" />
                </div>
                <div className="inputGroup">
                    <input className='formStyle' type="text" name='AddressLine2' defaultValue={orderDetails.AddressLine2} onChange={setUserDetails} placeholder="Apartment number, suite, etc*" />
                </div>
                <div className="inputGroup">
                    <Row>
                        <Col>
                            <input className='formStyle' type="text" name='City' defaultValue={orderDetails.City} onChange={setUserDetails} placeholder="City*" />
                        </Col>
                        <Col>
                            <CountryDropdown defaultOptionLabel="Country*" value={country} onChange={selectCountry} />
                        </Col>
                    </Row>
                </div>
                <div className="inputGroup">
                    <Row>

                        <Col>
                            <RegionDropdown blankOptionLabel="Region" defaultOptionLabel="Region" country={country} value={region} onChange={selectRegion} />
                        </Col>
                        <Col>
                            <input className='formStyle' type="number" placeholder="Zipcode*" name='Zipcode' defaultValue={orderDetails.Zipcode} onChange={setUserDetails} />
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="paymentButton">
                {
                    showButton ?
                        <StripeCheckout
                            stripeKey="pk_test_51H3MpiKYLWJclmfxNXVgxmAS7PAxf0tRVed9JiuCFEauDnJx39PuLpxHaYWWXaJfAFxVj87yo5WG7HDhouYx9cWn00Eok2TOdY"
                            token={handleToken}
                            amount={shoppingCart ? (shoppingCart.totalPrice * 1.2) * 100 : 0}
                            currency='EUR'
                        />
                        :
                        null
                }
            </div>

        </div>
    )
}

export default PaymentInfo