"use strict";

import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

export class RecipeListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>
                    <img style={{
                        margin: "left",
                        display: "block",
                        width: "80%",
                        maxWidth: "70px"
                    }} src={this.props.recipe.recipeImageURL}/>
                </td>
                <td><Link to={`/recipe/${this.props.recipe._id}`}>{this.props.recipe.title}</Link></td>
                <td><Link to={`/edit/${this.props.recipe._id}`}><Icon.Pencil /></Link></td>
                <td><Button
                    onClick={() => { if (window.confirm('Delete the item?')) { this.props.onDelete(this.props.recipe._id) }; }}><Icon.TrashFill /></Button>
                </td>
            </tr>
        );
    }
}