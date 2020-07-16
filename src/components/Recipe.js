import React from "react";
import Logo from "./../Assets/echef-logo.png";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const Recipe = ({ Title, Servings, id, difficulty, imageUrl }) => {
  // let recipeAddr = "http://localhost:8000/#/recipe/" + id
  console.log("imageUrl", imageUrl)
  let usedImg = Logo
  if(imageUrl !== undefined && imageUrl !== ""){
     usedImg = imageUrl
  }
  return (
    <div>
      <Card
        style={{ margin: "4px", minWidth: "5rem" }}
        className="Recipe"
        key={id}
      >
        <Link to={"recipe/" + id}>
          <Card.Header style={{ whitespace: "nowrap" }}>{Title}</Card.Header>
          <Card.Img src={usedImg}></Card.Img>
          {difficulty}
        </Link>
      </Card>
    </div>
  );
};

export default Recipe;
