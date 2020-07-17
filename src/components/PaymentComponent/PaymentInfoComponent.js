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



const PaymentInfo = ({user,shoppingCart,orderCompleted})=>{
    toast.configure();
    const[country,setCountry]=useState('');
    const[region,setRegion]=useState('');
    const[orderDetails,setOrderDetails]=useState({
        User:user._id,
        FirstName:'',
        LastName:'',
        AddressLine1:'',
        AddressLine2:'',
        City:'',
        Country:'',
        Region:'',
        Zipcode:''
    });
    const [cart]=useState({
        id:shoppingCart._id,
        totalPrice:shoppingCart.totalPrice,
        shipmentCost:Math.round((shoppingCart.totalPrice*0.2)*100)/100
    });
    


    function selectCountry(val){
        setCountry(val);
    }
    function selectRegion (val) {
        setRegion(val);
    }
    function setUserDetails(event){
        console.log("order details",orderDetails);
        var details=orderDetails;
        var name= event.target.name;
        if(name==='FirstName'){
            details.FirstName=event.target.value;
        }
        else if(name==='LastName'){
            details.LastName=event.target.value;
        }
        else if(name==='AddressLine1'){
            details.AddressLine1=event.target.value;
        }
        else if(name==='AddressLine2'){
            details.AddressLine2=event.target.value;
        }
        else if(name==='City'){
            details.City=event.target.value;
        }
        else if(name==='Zipcode'){
            details.Zipcode=event.target.value;
        }
        setOrderDetails(details);
        
    }
    
    function handleToken(token){
        let finalDetails=orderDetails;
        finalDetails.Country=country;
        finalDetails.Region=region;
        setOrderDetails(finalDetails);
        OrderService.createOrder({
            cart,
            orderDetails,
            token
        }).then((data) => {
            console.log('response:', data);
            if(data.status == 'success'){
                toast('You paid successfully!',{type: 'success'});
                orderCompleted();
            }
            else{
                toast('Something went wrong!',{type: 'error'});
            }
        }).catch(err => {
            console.error(err);
        });
    }

    return(
       <div className={shoppingCart ? "" : "disabledSection"}>
                <div className='shipmentDiv'>
                    <h4 className='paymentTitle'>Shipping Information</h4>
                    <div className="inputGroup">
                    <Row>
                        <Col>
                            <input className='formStyle' type="text" value={orderDetails.FirstName} name='FirstName' onChange={setUserDetails} placeholder='First Name'/>
                        </Col>
                        <Col>
                            <input className='formStyle' type="text" value={orderDetails.LastName} name='LastName' onChange={setUserDetails} placeholder="Last Name" />
                        </Col>
                    </Row>
                    </div>
                    <div className="inputGroup">
                        <input className='formStyle' type="text" defaultValue={user.shippingAddress} name='AddressLine1' value={orderDetails.AddressLine1} onChange={setUserDetails} placeholder="Address" />
                    </div>
                    <div className="inputGroup">
                        <input className='formStyle' type="text" name='AddressLine2' value={orderDetails.AddressLine2} onChange={setUserDetails} placeholder="Apartment number, suite, etc(optional)" />
                    </div>
                    <div className="inputGroup">
                    <Row>
                        <Col>
                            <input className='formStyle' type="text" name='City' value={orderDetails.City} onChange={setUserDetails} placeholder="City" />
                        </Col>
                        <Col>
                                <CountryDropdown defaultOptionLabel="Country" value={country} onChange={selectCountry} />
                        </Col>
                    </Row>
                    </div>
                    <div className="inputGroup">
                        <Row>
                            
                            <Col>
                                <RegionDropdown blankOptionLabel="Region" defaultOptionLabel="Region" country={country} value={region} onChange={selectRegion} />
                            </Col>
                            <Col>
                                <input className='formStyle' type="number" placeholder="Zipcode" name='Zipcode' value={orderDetails.Zipcode} onChange={setUserDetails} />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="paymentButton">
                    <StripeCheckout 
                    stripeKey="pk_test_51H3MpiKYLWJclmfxNXVgxmAS7PAxf0tRVed9JiuCFEauDnJx39PuLpxHaYWWXaJfAFxVj87yo5WG7HDhouYx9cWn00Eok2TOdY"
                    token={handleToken}
                    amount={shoppingCart?shoppingCart.totalPrice*100:0}
                    currency='EUR'
                    />
                </div>
                
       </div> 
    )
}

export default PaymentInfo