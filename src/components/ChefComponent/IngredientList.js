"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { IngredientListRow } from './IngredientListRow';


const dataTableStyle = {
    'marginBottom': '36px'
};

export const IngredientList = ({ingredients}) => (
        <DataTable plain style={dataTableStyle}>
        <TableHeader>
                <TableRow>
                    <TableColumn>Select ingredients for the recipe</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                <IngredientListRow ingredients={ingredients} />
            </TableBody>
        </DataTable>
);

