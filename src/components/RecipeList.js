"use strict";

import React from 'react';
//import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';
import Recipe from "./Recipe"
//import { MovieListRow } from './MovieListRow';


export  const RecipeList = ({recipes }) => {

return (
  // {recipes.map(recipe => <li>{recipe.title}</li> ) }
   recipes.map(rec =>
    (<Recipe Title={rec.title} Author={rec.Author} Servings={rec.Servings} Ingredients={rec.Ingredients}/>)
  )
)
   

}


