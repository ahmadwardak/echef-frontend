"use strict";

import React from 'react';
import { Table } from 'react-bootstrap';
import { RecipeListRow } from './RecipeListRow';

export const ChefViewList = ({ recipes, onDelete }) => {
    return (
        recipes.length === 0 ?
            <p>No Recipe</p>
            :
            <Table>
                <thead>
                    <tr>
                        <th>Recipe Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe, i) => <RecipeListRow key={i} recipe={recipe} onDelete={(id) => onDelete(id)} />)}
                </tbody>
            </Table>
    )
};

