"use strict";

import React from 'react';
import Recipe from "./Recipe"



export  const RecipeList = ({recipes }) => {

return (

   recipes.map(rec =>
    (<Recipe key={rec._id} Title={rec.title} Servings={rec.servingSize} id={rec._id} difficulty={rec.difficulty}/>)
  )
)
   

}


