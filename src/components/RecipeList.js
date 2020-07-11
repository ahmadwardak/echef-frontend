"use strict";

import React from 'react';
import Recipe from "./Recipe"

import CardDeck from "react-bootstrap/CardDeck";
import { Grid } from 'react-bootstrap-icons';
// import { Container } from 'react-bootstrap';
import { Row,Col,Container } from 'react-bootstrap';


export const RecipeList = ({ recipes }) => {

  return (
    <Container fluid >
      <span>we</span>
      <Row  xs={2} md={4} sm>
        {recipes.map((rec) => {
          return(
          <Col  >
          <Recipe key={rec._id} Title={rec.title} id={rec._id} difficulty={rec.difficulty} />
          </Col>
          )
        }
        )}
      </Row>
    </Container>
  )


}


