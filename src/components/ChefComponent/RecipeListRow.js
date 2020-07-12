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
                <td><Link to={`/recipe/${this.props.recipe._id}`}>{this.props.recipe.title}</Link></td>
                <td><Link to={`/edit/${this.props.recipe._id}`}><Icon.Pencil/></Link></td>
                <td><Button onClick={() => this.props.onDelete(this.props.recipe._id)}><Icon.TrashFill/></Button></td>
            </tr>
        );
    }
}