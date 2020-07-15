import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './Recipe.css';
import '../../App.css';
import IngredientsService from '../../services/IngredientsService';
import { Row, Col, Form, FormControl, InputGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';

class Ingredient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Title: "",
            Brands: [],
            IngredientUnit: ""
        }

        this.pointsInput = React.createRef();
        this.brandSelectInput = React.createRef();

        console.log(this.props);
        // this.priceChanged = this.priceChanged.bind(this);
        this.fixFloat = this.fixFloat.bind(this);

    }

    componentWillMount(props) {
        IngredientsService.getIngredient(this.props.ingredient.id).then((data) => {
            this.setState({ Brands: data.ingredientBrands });
            this.setState({ Title: data.name });
            this.setState({ IngredientUnit: data.ingredientUnit });
        }).catch((e) => {
            console.error(e);
        });
    }

    // amountChanged(event) {
    //     this.setState({ Amount: this.pointsInput.current.value });
    //     console.log(this.pointsInput.current.value)
    //     this.props.cartHandler(this.pointsInput.current.value, this.props.id, "amount");

    // }


    // priceChanged(event) {
    //     console.log("eventttt", event.target.value);
    //     var price = 0;
    //     if (event.target.value != 0) {
    //         price = this.state.Brands.find(br => br.brandName == event.target.value).price;
    //         this.props.cartHandler(event.target.value, this.props.id, "brand");
    //         this.props.cartHandler(true, this.props.id, "isActive");
    //     }
    //     else {
    //         this.props.cartHandler(this.props.ingredient.ingredientBrand, this.props.id, "brand");
    //         this.props.cartHandler(false, this.props.id, "isActive");

    //     }
    //     this.props.cartHandler(price, this.props.id, "basePrice");
    //     this.props.cartHandler(price * this.props.servingSize, this.props.id, "price");


    //     this.setState({ selectedBrand: event.target.value });
    //     console.log("SELECTED:", event.target.value);
    //     this.setState({ Price: price });
    // }
    fixFloat(original) {
        if (isNaN(original))
            return 0;

        var result = Math.round(original * 100) / 100;
        return result;
    }


    render() {
        return (

            <Row xs="12" className="mb-1">
                <Col xs="3" className="pl-3 pr-0">
                    <FormControl
                        aria-label="Ingredient Amount"
                        value={this.props.ingredient.amount}
                        onChange={() => this.props.onAmountChange(this.pointsInput.current.value, this.props.ingredient.id)}
                        ref={this.pointsInput}
                        name="points"
                        type="number"
                        min="0"
                        step="1"
                    />
                </Col>
                <Col xs="2" className="pl-3 pr-0 pt-1">
                    <Form.Label style={{ color: "white" }}>
                        {this.state.IngredientUnit}
                    </Form.Label>

                </Col>
                <Col xs="5" className="pl-3 pr-0">
                    <Form.Control as="select"
                        ref={this.brandSelectInput}
                        onChange={() => this.props.onBrandChange(this.brandSelectInput.current.value, this.props.ingredient.id)}
                        defaultValue='0'  >
                        <option key={0} value={0}>--{this.state.Title} from:--</option>
                        {this.state.Brands.map(dt => <option key={dt.brandName} value={dt.brandName}>{dt.brandName} </option>)}
                    </Form.Control>
                </Col>
                <Col xs="2" className="pl-3 pr-0 pt-1">
                    <Form.Label style={{ color: "white" }}>
                        {this.fixFloat(this.props.ingredient.price)} €
                </Form.Label>
                </Col>

            </Row>


        );
    }
}

export default withRouter(Ingredient);