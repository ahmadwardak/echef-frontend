import React from 'react'

const Recipe = ({Title,Servings,Author,id }) => {
  let recipeAddr="http://localhost:8000/#/recipe/"+id
  return (
    <li className="Recipe" key={id}>
      <a href={recipeAddr}>
        {Title}, {Servings}, {Author} 
        </a>
    </li>
  )
}

export default Recipe