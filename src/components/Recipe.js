import React, { useState } from "react";
import Logo from "./../Assets/echef-logo.png";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import RecipeReviewService from '../services/RecipeReviewService';
const Recipe = ({ Title, Servings, id, difficulty, imageUrl }) => {

  console.log("imageUrl", imageUrl)
  let usedImg = Logo
  if(  imageUrl  && imageUrl !== "" && imageUrl !== "undefined"){
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
          <Card.Footer>Difficulty level: {difficulty} </Card.Footer>
        </Link>
      </Card>
    </div>
  );
};

export default Recipe;
