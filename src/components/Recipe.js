import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import Rating from 'react-rating';
const Recipe = ({ Title, Servings, id, difficulty, imageUrl, overallRating }) => {
  // let recipeAddr = "http://localhost:8000/#/recipe/" + id
  // console.log("imageUrl", overallRating)
  // console.log("imageUrl", imageUrl)
  let usedImg;
  if (imageUrl !== undefined && imageUrl !== "") {
    usedImg = imageUrl
  }
  return (
    <Card key={id} className="bg-white mb-3 font-weight-light">
      <Link style={{ textDecoration: 'none' }} className="text-dark" to={"recipe/" + id}>
        <Card.Header className="bg-white p-2">
          <Row>
            <Col xs={12} md={12}>{Title}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0 m-0">
          <Image style={{ maxWidth: '100%', width: '100%', height: 'auto', backgroundSize: 'contain' }}
            src={usedImg}></Image>
        </Card.Body>
        <Card.Footer className="bg-white py-2 px-2" >
          <div className="p-0 mb-2" style={{ fontSize: '90%' }}>
            <span style={{ float: 'left' }}>{difficulty}</span>

            <span style={{ float: 'right' }}>
              <Rating style={{ color: 'green' }}
                emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
                fullSymbol={<FontAwesomeIcon icon={faStar} />}
                fractions={2}
                initialRating={overallRating}
                readonly
              />
            </span>

          </div>
          <div style={{ clear: 'both' }}></div>
        </Card.Footer>
      </Link>
    </Card>
  );
};

export default Recipe;
