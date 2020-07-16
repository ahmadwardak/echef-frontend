"use strict";

import React from 'react';
import Recipe from "./Recipe"
import { Row, Col, Container } from 'react-bootstrap';


export const RecipeList = ({ recipes }) => {

  return (
    <Container fluid >
      <Row xs={1} md={4} sm>
        {recipes.map((rec, i) => {
          return (
            <Col key={i} >
              <Recipe key={rec._id} Title={rec.title} id={rec._id} difficulty={rec.difficulty} imageUrl={rec.recipeImageURL} />
            </Col>
          )
        }
        )}
      </Row>
    </Container>
  )


}


