"use strict";

import React from 'react';
import Recipe from "./Recipe"
import { Card, Row, Col, Container } from 'react-bootstrap';


export const RecipeList = ({ recipes }) => {

  return (<Row>
    {recipes.map((rec, i) => {
      return (
        <Col xs={6} md={4} key={i} >
          <Recipe key={rec._id}
            Title={rec.title}
            id={rec._id}
            difficulty={rec.difficulty}
            overallRating={rec.OverallRating}
            imageUrl={rec.recipeImageURL} />
        </Col>
      )
    }
    )}
  </Row>
  )


}


