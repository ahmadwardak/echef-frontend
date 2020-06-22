"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { RecipeListRow } from './RecipeListRow';


const dataTableStyle = {
    'marginBottom': '36px'
};

export const ChefViewList = ({recipes, onDelete}) => (
    <div>
        <DataTable plain style={dataTableStyle}>
        <TableHeader>
            <TableRow>
                <TableColumn>My List</TableColumn>
            </TableRow>
            </TableHeader>
            <TableBody>
                {recipes.map((recipe, i) => <RecipeListRow key={i} recipe={recipe} onDelete={(id)=>onDelete(id)}/>)}
            </TableBody>
        </DataTable>
    </div>
);

