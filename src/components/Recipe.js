import React from 'react'

const Recipe = ({Title,Servings,Author,Ingredients }) => {
  
  return (
    <li className="Recipe" key={Title}>
        {Title}, {Servings}, {Author}, <ul>{Ingredients.map(ing => <li key={ing.Name}> {ing.Name}</li>)} </ul>
    </li>
  )
}

export default Recipe