import React from 'react'
import Logo from './../Assets/echef-logo.png';
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';
const Recipe = ({ Title, Servings, id, difficulty }) => {
 // let recipeAddr = "http://localhost:8000/#/recipe/" + id
  return (
<div>
    
      <Card style={{margin:"5px"}}className="Recipe" key={id}>
        <Link to={"recipe/"+id}>
          <Card.Header style={{whitespace:"nowrap"}}>
            {Title}
          </Card.Header>
          <Card.Img src={Logo}>
          </Card.Img>
          {difficulty}
          </Link>
      </Card>
</div>
  )
}

export default Recipe