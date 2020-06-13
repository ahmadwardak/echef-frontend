"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button } from 'react-md';
import { Link } from 'react-router-dom';

import { SimpleLink } from '../SimpleLink';

export class RecipeListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TableRow key={this.props.key}>
                <TableColumn><SimpleLink to={`/recipe/${this.props.recipe.id}`}>{this.props.recipe.title}</SimpleLink></TableColumn>
                <TableColumn><Link to={`/edit/${this.props.recipe.id}`}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                <TableColumn><Button onClick={() => this.props.onDelete(this.props.recipe.id)} icon>delete</Button></TableColumn>
            </TableRow>
        );
    }
}