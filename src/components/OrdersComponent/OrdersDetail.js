import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Col,Card, Accordion, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import UserService from '../../services/UserService';
import './Orders.css';
import Moment from 'moment';
import BasketItem from '../PaymentComponent/BasketItem';


class OrderDetail extends Component {

    constructor(props) {
        super(props);
        Moment.locale('en');


    }

   



   

    render() {
        return (

            <div>
                        <Card>
                                <Accordion.Toggle as={Card.Header} eventKey={this.props.order._id}>

                                        <span className="orderNumberBack">
                                        <span className="orderCount">
                                        {this.props.index+1}
                                        </span>
                                        </span>
                                        <h5 className='text-center ordersTitle'>-Order ID: {this.props.order._id}-</h5>
                  
                                
                                    <div className='headerTitleBottom'>
                                    <Row className='text-center orderRow'>
                                        <Col>
                                            <p><strong>Ordered By:</strong> {this.props.order.shippingInfo.FirstName} {this.props.order.shippingInfo.LastName}</p>
                                        </Col>
                                        <Col>
                                            <p><strong>Date Ordered:</strong> {Moment(this.props.order.dateCreated).format('d MMM YYYY')}</p>
                                        </Col>
                                        <Col>
                                            <p><strong>Order Status:</strong> <span className='statusBack'>{this.props.order.orderStatus}</span></p>
                                        </Col>
                                        <Col>
                                            <p><strong>Shipping Date:</strong> {Moment(this.props.order.dateCreated).format('d MMM YYYY')}</p>
                                        </Col>
                                    </Row>
                                    <Row className='text-center orderRow'>
                                        <Col>
                                            <p><strong>Shipping Address:</strong> {this.props.order.shippingInfo.AddressLine1} {this.props.order.shippingInfo.AddressLine2}, 
                                            {this.props.order.shippingInfo.City} {this.props.order.shippingInfo.Zipcode}, {this.props.order.shippingInfo.Country}</p>
                                        </Col>
                                    </Row>
                                    <Row className='text-center orderRow'>
                                        <Col>
                                            <p><strong>Items Price:</strong> <strong className='greenText'>{this.props.order.itemsPrice}  €</strong></p>
                                        </Col>
                                        <Col>
                                            <p><strong>Shipment Cost:</strong> <strong className='greenText'>{this.props.order.shipmentCost}  €</strong></p>
                                        </Col>
                                        <Col>
                                            <p><strong>Total Price:</strong> <strong className='greenText'>{this.props.order.totalCost}  €</strong></p>
                                        </Col>
                                    </Row>
                                    <Row className='text-center orderRow'>
                                        <Col>
                                            <Button className='btn btn-success'>Press to see  the items</Button>
                                        </Col>
                                    </Row>
                                    </div>
                                    
                                </Accordion.Toggle>
                            <Accordion.Collapse eventKey={this.props.order._id}>
                                <Card.Body className="ordersCartBack">
                                    {this.props.order.cartItems.map(recipe=>
                                        recipe.recipeIngredients.map((ing,index)=> 
                                            <BasketItem item={ing} showDeleteButtton={false} key={index}/>
                                        ))}
                                   
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                </div>
                            
        );
    }
}

export default OrderDetail;