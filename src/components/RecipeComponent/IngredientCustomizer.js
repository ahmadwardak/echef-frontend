import React, { Component } from 'react';
import './Recipe.css';
import '../../App.css';
import Ingredient from './Ingredient.js'
import { Container, Button } from 'react-bootstrap';
import IngredientsService from '../../services/IngredientsService';

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
            var newPrice = (element.basePrice * newServingSize) / this.props.servingSize;
            newPrice = Math.round(newPrice * 100) / 100;
            var newAmount = (newServingSize * element.baseAmount) / this.props.servingSize;
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
        newItems[itemIndex].price = newItems[itemIndex].basePrice / newItems[itemIndex].baseAmount * newItems[itemIndex].amount;

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
                newItems[itemIndex].price = (basePrice / this.servingSizeInput.current.value) * newItems[itemIndex].amount;

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
            <div className='ingredientBox'>
                <div className='servingSizeDiv'>
                    <h4 className='whiteFont bigCol'>For how many people you are cooking?</h4>
                    <input type="number" id="servingSizeInput" className="servingSizeBox" step="1" min="2"

                        ref={this.servingSizeInput} defaultValue={this.state.ServingSize} onChange={this.changeServingSize} onKeyDown={this.preventKeyDown}></input>
                </div>
                <hr className='whiteFont' />
                <div className='ingredientChanger'>
                    <h5 className="whiteFont boldFont">Ingredients needed for {this.state.ServingSize} people:</h5>
                    <div className="ScrollableContent">
                        {this.state.cartItems.map(ing => <Ingredient onBrandChange={this.handleBrandChange} onAmountChange={this.handleAmountChange} id={ing.id} key={ing.id} ingredient={ing} />)}

                    </div>
                    <div className="totalPrice">
                        <ul className="totalPriceList">
                            <li><span className="whiteFont boldFont">Total</span> <span className="whiteFont boldFont">{this.state.totalPrice} €</span></li>
                        </ul>
                    </div>

                </div>
                <div className="d-flex justify-content-center">
                    <Button className="btn btn-success btn-block" onClick={this.addToCart} type="submit" disabled={!this.state.buttonEnabled}>
                        Order
                    </Button>
                </div>

            </div>



        );
    }
}

export default IngredientCustomizer;