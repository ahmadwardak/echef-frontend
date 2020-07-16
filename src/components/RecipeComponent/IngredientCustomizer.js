import React, { Component } from 'react';
import './Recipe.css';
import '../../App.css';
import Ingredient from './Ingredient.js'
import IngredientsService from '../../services/IngredientsService';

import { Container, Row, Col, Form, FormControl, InputGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';

class IngredientCustomizer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPrice: 0,
            ServingSize: this.props.servingSize,
            buttonEnabled: false,
            cartItems: [],
        }


        this.servingSizeInput = React.createRef();

        this.changeServingSize = this.changeServingSize.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this);


        this.handleButton = this.handleButton.bind(this);
        this.preventKeyDown = this.preventKeyDown.bind(this);

        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleBrandChange = this.handleBrandChange.bind(this);

    }

    componentWillMount(props) {

        let initialItems = [];
        this.props.ingredientsNeeded.map(ing => {
            initialItems.push({
                id: ing.ingredientID,
                amount: ing.ingredientQuantity,
                price: 0,
                brand: '',
                basePrice: 0,
                baseAmount: ing.ingredientQuantity,
                isActive: false
            });
        });
        console.log('initial', initialItems)
        this.setState({ cartItems: initialItems });
    }

    changeServingSize(sSize) {
        var newServingSize = sSize.target.value;
        console.log("newservs", newServingSize);
        this.setState({ ServingSize: newServingSize });
        let newItems = [];
        this.state.cartItems.forEach(element => {
            var newAmount = (newServingSize * element.baseAmount) / this.props.servingSize;
            var newPrice = element.basePrice * newAmount;
            newPrice = Math.round(newPrice * 100) / 100;
            element.price = newPrice;
            element.amount = newAmount;
            newItems.push(element);
        });

        this.setState({ cartItems: newItems });
        console.log('serving changed', newItems);
        this.calculateTotalPrice();

    }

    addToCart() {
        let finalItems = [];
        this.state.cartItems.map(item => {
            if (item.price != 0) {
                finalItems.push({
                    ingredientID: item.id,
                    ingredientQuantity: item.amount,
                    ingredientBrand: item.brand,
                    price: item.price
                });
            }
        });
        this.props.addToShoppingCart(finalItems, this.state.totalPrice);
    }

    calculateTotalPrice() {
        let total = 0.0;
        this.state.cartItems.forEach(item => {
            total = parseFloat(total) + parseFloat(item.price);
        });
        console.log("total", total);
        this.setState({ totalPrice: (Math.round(total * 100) / 100) });
        this.handleButton();
    }

    handleAmountChange(value, ingredientID) {
        console.log('amount change', value);
        console.log('ing id', ingredientID);
        let newItems = this.state.cartItems;
        //console.log(newItems);
        let itemIndex = newItems.findIndex(it => it.id == ingredientID);
        newItems[itemIndex].amount = parseInt(value);
        newItems[itemIndex].price = newItems[itemIndex].basePrice * newItems[itemIndex].amount;

        this.setState({ cartItems: newItems });
        console.log('amount handler', newItems);
        this.calculateTotalPrice();
    };

    handleBrandChange(value, ingredientID) {
        console.log('brand changed', value);
        console.log('ing id', ingredientID);
        let basePrice = 0;
        if (value !== '0') {
            IngredientsService.getIngredient(ingredientID).then((data) => {
                basePrice = data.ingredientBrands.find(br => br.brandName == value).price;
                console.log(basePrice);
                let newItems = this.state.cartItems;
                let itemIndex = newItems.findIndex(it => it.id == ingredientID);
                newItems[itemIndex].basePrice = basePrice;
                newItems[itemIndex].brand = value;
                newItems[itemIndex].isActive = true;
                newItems[itemIndex].price = basePrice * newItems[itemIndex].amount;

                this.setState({ isActive: true });
                this.setState({ cartItems: newItems });
                console.log('brand handler', newItems);

                this.calculateTotalPrice();
            }).catch((e) => {
                console.error(e);
            });
        } else {
            let newItems = this.state.cartItems;
            let itemIndex = newItems.findIndex(it => it.id == ingredientID);
            newItems[itemIndex].basePrice = basePrice;
            newItems[itemIndex].brand = value;
            newItems[itemIndex].isActive = false;
            newItems[itemIndex].price = 0;

            this.setState({ isActive: false });
            this.setState({ cartItems: newItems });
            console.log('brand handler', newItems);

            this.calculateTotalPrice();
        }

    }



    handleButton() {
        let isEnabled = false;
        this.state.cartItems.forEach(item => {
            if (item.isActive == true)
                isEnabled = true;
        });
        this.setState({ buttonEnabled: isEnabled });
    }
    preventKeyDown(event) {
        event.preventDefault();
    }

    render() {
        return (

            <div className="container-fluid pt-2" style={{ backgroundColor: '#393432' }}>

                <Row className="pb-2" style={{ borderBottom: '1px solid white' }}>
                    <Col xs={12} md={9}>
                        <h6 className='whiteFont'>For how many people you are cooking?</h6>
                    </Col>
                    <Col xs={12} md={3}>
                        <FormControl
                            defaultValue={this.state.ServingSize} onChange={this.changeServingSize} onKeyDown={this.preventKeyDown}
                            ref={this.servingSizeInput}
                            name="servingSizeInput"
                            id="servingSizeInput"
                            type="number"
                            min="2"
                            step="1"
                        />
                    </Col>
                </Row>

                <Row className="py-2">
                    <Col xs={12} md={12}>
                        <h6 className="whiteFont">Ingredients needed for {this.state.ServingSize} people:</h6>
                    </Col>
                </Row>

                <Row className="pb-2">
                    <Col xs={12} md={12}>
                        {this.state.cartItems.map(ing => <Ingredient onBrandChange={this.handleBrandChange} key={ing.id} onAmountChange={this.handleAmountChange} id={ing.id} ingredient={ing} />)}

                    </Col>
                </Row>
                <Row className="pt-2" style={{ borderTop: '1px solid white', borderBottom: '1px solid white' }}>
                    <Col xs={12} md={10}>

                        <h6 className="whiteFont">Total Price: </h6>
                    </Col>
                    <Col xs={12} md={2}>

                        <h6 className="whiteFont">{this.state.totalPrice} €</h6>
                    </Col>
                </Row>

                <Row className="py-2">
                    <Col xs={12} md={12}>
                        <Button className="btn btn-success btn-block" onClick={this.addToCart} type="submit" disabled={!this.state.buttonEnabled}>
                            Order
                    </Button>
                    </Col>
                </Row>

            </div>



        );
    }
}

export default IngredientCustomizer;