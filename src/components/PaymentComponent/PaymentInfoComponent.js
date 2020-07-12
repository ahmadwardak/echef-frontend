import React, { useState, useEffect } from 'react';
import {  Button, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import StripeCheckout from 'react-stripe-checkout';
import OrderService from '../../services/OrderService';
import { PayPalButton } from "react-paypal-button-v2";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css';



const PaymentInfo = ({user})=>{
    console.log("USER:",user);
    const[country,setCountry]=useState('');
    const[region,setRegion]=useState('');
    const[product]=useState({
        name:'test product',
        price:8.90,
        description:'this is a test'
    });


    function selectCountry(val){
        setCountry(val);
    }
    function selectRegion (val) {
        setRegion(val);
    }

    function handleToken(token){
        OrderService.createOrder({
            product,
            token
        }).then((data) => {
            console.log('response:', data.status);
            if(data.status == 'success'){
                toast('You paid successfully!',{type: 'success'});

            }
            else{
                toast('Something went wrong',{type: 'error'});
            }
        }).catch(err => {
            console.error(err);
        });
    }

    return(
       <div className="scrollable">
           <Form>
               <div className='contactDiv'>
                    <h4>Contact Information</h4>
                    <Form.Group controlId="formEmail">
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
               </div>
                <div className='shipmentDiv'>
                    <h4>Shipping Information</h4>
                    <Row>
                        <Col>
                            <Form.Group controlId="formFirstName">
                                <Form.Control type="text" placeholder="First Name" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formLastName">
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formAddress">
                                <Form.Control type="text" placeholder="Address" />
                    </Form.Group>
                    <Form.Group controlId="formApartment">
                                <Form.Control type="text" placeholder="Apartment number, suite, etc(optional)" />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="formCity">
                                <Form.Control type="text" placeholder="City" />
                            </Form.Group>
                        </Col>
                        <Col>
                                <CountryDropdown defaultOptionLabel="Country" value={country} onChange={selectCountry} />
                        </Col>
                    </Row>
                    
                    <div className="countrySelector">
                        <Row>
                            
                            <Col>
                                <RegionDropdown blankOptionLabel="Region" defaultOptionLabel="Region" country={country} value={region} onChange={selectRegion} />
                            </Col>
                            <Col>
                                <Form.Group controlId="formZipcode">
                                    <Form.Control type="number" placeholder="Zipcode" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="paymentButton">
                    <StripeCheckout 
                    stripeKey="pk_test_51H3MpiKYLWJclmfxNXVgxmAS7PAxf0tRVed9JiuCFEauDnJx39PuLpxHaYWWXaJfAFxVj87yo5WG7HDhouYx9cWn00Eok2TOdY"
                    token={handleToken}
                    amount={product.price*100}
                    currency='EUR'
                    />
                </div>
                
            </Form>      
       </div> 
    )
}

export default PaymentInfo