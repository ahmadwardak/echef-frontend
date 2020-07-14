import React, { useRef, useState, useEffect } from 'react';
import './Recipe.css';
import '../../App.css';
import IngredientsService from '../../services/IngredientsService';

import { Row, Col, Form, FormControl, InputGroup, Button, DropdownButton, Dropdown } from 'react-bootstrap';

const Ingredient = ({ id, cartHandler, servingSize, ingredient }) => {
    return (
        <div className='ingredientSection'>
            <BrandChoice id={id} cartHandler={cartHandler} ingredient={ingredient} servingSize={servingSize} />
        </div>
    )
}

const BrandChoice = ({ id, cartHandler, servingSize, ingredient }) => {
    let pointsInput;

    function amountChanged(event) {
        setAmount(pointsInput.value);
        console.log(pointsInput.value)
        cartHandler(pointsInput.value, id, "amount");

    }


    function priceChanged(event) {
        console.log("eventttt", event.target.value);
        var price = 0;
        if (event.target.value != 0) {
            price = Brands.find(br => br.brandName == event.target.value).price;
            cartHandler(event.target.value, id, "brand");
            cartHandler(true, id, "isActive");
        }
        else {
            cartHandler(ingredient.ingredientBrand, id, "brand");
            cartHandler(false, id, "isActive");

        }
        cartHandler(price, id, "basePrice");
        cartHandler(price * servingSize, id, "price");


        setSelectedBrand(event.target.value);
        console.log("SELECTED:", selectedBrand);
        setPrice(price);
    }
    function fixFloat(original) {
        var result = Math.round(original * 100) / 100;
        return result;
    }
    const [Brands, setBrands] = useState([]);
    const [Title, setTitle] = useState("");
    const [Parameter, setParameter] = useState("");
    const [Price, setPrice] = useState(0);

    const [selectedBrand, setSelectedBrand] = useState('');

    // var tmp = (ingredient.ingredientQuantity) * servingSize;
    const [Amount, setAmount] = useState(ingredient.ingredientQuantity * servingSize);
    const [baseAmount, setBaseAmount] = useState(ingredient.ingredientQuantity);

    useEffect(() => {
        IngredientsService.getIngredient(ingredient.ingredientID).then((data) => {
            setBrands(data.ingredientBrands);
            setTitle(data.name);
            setParameter(data.ingredientUnit);
        }).catch((e) => {
            console.error(e);
        });
    }, []);
    return (

        <Row xs="12" className="mb-1">
            <Col xs="3" className="pl-3 pr-0">
                <FormControl
                    aria-label="Ingredient Amount"
                    defaultValue={Amount}
                    onChange={amountChanged}
                    ref={el => { pointsInput = el }}
                    name="points"
                    type="number"
                    min="0"
                    step="1"
                />
            </Col>
            <Col xs="2" className="pl-3 pr-0 pt-1">
                <Form.Label style={{ color: "white" }}>
                    {Parameter}
                </Form.Label>

            </Col>
            <Col xs="5" className="pl-3 pr-0">
                <Form.Control as="select"
                    onChange={priceChanged}
                    defaultValue={selectedBrand}  >
                    <option key={0} value={0}>--{Title} from:--</option>
                    {Brands.map(dt => <option key={dt.brandName} value={dt.brandName}>{dt.brandName} </option>)}
                </Form.Control>
            </Col>
            <Col xs="2" className="pl-3 pr-0 pt-1">
                <Form.Label style={{ color: "white" }}>
                    {fixFloat((Price * Amount) / baseAmount)} €
                </Form.Label>
            </Col>

        </Row>
    )
}

export default Ingredient