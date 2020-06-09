import React from 'react'

const Recipe = ({Title,Servings,Author }) => {
  
  return (
    <li className="Recipe" key={Title}>
        {Title}, {Servings}, {Author} 
    </li>
  )
}

export default Recipe