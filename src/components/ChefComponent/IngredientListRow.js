import React, { useState, useEffect } from 'react';
import '../RecipeComponent/Recipe.css';
import { Card, Form, ButtonGroup, Button, Row, Col, Alert } from "react-bootstrap";
import '../../App.css';
import IngredientsService from '../../services/IngredientsService';

//Single row of ingredient selection in the recipe form
class IngredientListRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Ingredients: [],
            IngredientUnit: '',
            IngredientQuantity: this.props.ingredient.ingredientQuantity,
            IngredientBrands: []
        }

        this.selectedIngredient = this.selectedIngredient.bind(this);
    }

    componentWillMount(props) {
        IngredientsService.getAll().then((data) => {
            this.setState({ Ingredients: data });
            if (this.props.ingredient.ingredientID !== "") {
                let ingr = this.state.Ingredients.find(dt => dt._id == this.props.ingredient.ingredientID)
                this.setState({ IngredientBrands: ingr.ingredientBrands })
                this.setState({ IngredientUnit: ingr.ingredientUnit })
            }
        }).catch((e) => {
            console.error(e);
        });

    }


    selectedIngredient(event) {

        var id = event.target.value;
        console.log("called", this.state.Ingredients);
        let ingr = this.state.Ingredients.find(dt => dt._id == id)
        //console.log("ingr",ingr)
        this.setState({ IngredientBrands: ingr.ingredientBrands })
        this.setState({ IngredientUnit: ingr.ingredientUnit })

    }

    render() {
        return (
            <Row>

                <Col xs={12} md={4}>

                    <Form.Group className="mb-1">
                        <Form.Control as="select" value={this.props.ingredient.ingredientID} name="ingredientID" onChange={(e, i) => {
                            this.props.onChange(e, i);
                            this.selectedIngredient(e)
                        }}
                        >
                            <option value="0">--Select ingredient--</option>
                            {this.state.Ingredients.map((dt, i) =>
                                <option key={dt._id} value={dt._id}  >{dt.name}
                                </option>)}

                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={12} md={2}>

                    <Form.Group className="mb-1">
                        <Form.Control type="number" name="ingredientQuantity" step="1" defaultValue={this.state.IngredientQuantity} onChange={this.props.onChange} />

                    </Form.Group>
                </Col>
                <Col xs={12} md={2}>
                    <Form.Group className="mb-1">
                        <Form.Label name="ingredientUnit"   >{this.state.IngredientUnit} </Form.Label>
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>

                    <Form.Group className="mb-1">
                        <Form.Control as="select" value={this.props.ingredient.ingredientBrand} name="ingredientBrand" onChange={this.props.onChange}>
                            <option>--Select brand--</option>
                            {this.state.IngredientBrands.map((dt, i) => <option key={i} value={dt.brandName}>{dt.brandName} </option>)}

                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

        )
    }
}


export default IngredientListRow;