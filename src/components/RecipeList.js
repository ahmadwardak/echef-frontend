"use strict";

import React from 'react';
import Recipe from "./Recipe"



export  const RecipeList = ({recipes }) => {

return (

   recipes.map(rec =>
    (<Recipe key={rec.id} Title={rec.Title} Author={rec.Author} Servings={rec.Servings} id={rec.id} difficulty={rec.Difficulty}/>)
  )
)
   

}


