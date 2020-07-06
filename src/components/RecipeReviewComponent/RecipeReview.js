import React, { Component } from "react";
import Moment from 'react-moment';
import Rating from 'react-rating';
import RecipeReviewService from '../../services/RecipeReviewService';
import { Card, Figure, Image, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import ReactPlayer from 'react-player'

import VideoThumbnail from 'react-video-thumbnail';

class RecipeReview extends Component {


    constructor(props) {
        super(props);

        this.state = {
            reviews: [],
            id: ''
        }
    };

    componentWillMount() {
        const recipeId = this.props.recipeId;
        this.setState({ id: recipeId });
        const reviews = RecipeReviewService.getReviews(this.props.recipeId).then((data) => {
            this.setState({
                reviews: data

            });
            console.log(data);

        }).catch((e) => {
            console.error(e);
        });

    }


    render() {

        return (
            < div className="row" >
                {
                    this.state.reviews.map(review => (

                        <Card
                            bg='light'
                            key={review._id}
                            text='dark'
                            className="mb-2 w-100"
                        >
                            <Card.Header>{review.heading} <Rating style={{ color: 'green' }}
                                emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
                                fullSymbol={<FontAwesomeIcon icon={faStar} />}
                                fractions={2}
                                initialRating={review.overallRating}
                                readonly
                            />
                                <div className="float-right">
                                    <small className="text-muted">{review.addedbyUser.fullName} | <Moment format="DD MMM YYYY h:mm a">
                                        {review.dateCreated}
                                    </Moment></small>
                                </div></Card.Header>
                            <Card.Body className="py-1" style={{ fontSize: '90%' }}>
                                <Card.Text>
                                    <span className="mb-2 mt-0" style={{ display: 'block' }}>
                                        {review.detail}
                                    </span>
                                    <span>Quality: <Rating style={{ color: 'green' }}
                                        emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
                                        fullSymbol={<FontAwesomeIcon icon={faStar} />}
                                        fractions={2}
                                        initialRating={review.qualityRating}
                                        readonly
                                    /></span>
                                    <br />
                                    <span>Value for Money: <Rating style={{ color: 'green' }}
                                        emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
                                        fullSymbol={<FontAwesomeIcon icon={faStar} />}
                                        fractions={2}
                                        initialRating={review.valueForMoneyRating}
                                        readonly
                                    /></span>
                                </Card.Text>
                                {Object.keys(review.videoCollection).length !== 0 || Object.keys(review.imageCollection).length !== 0 ?

                                    <Container>
                                        <Row>
                                            {review.imageCollection.map(image => (
                                                <Col md={3} id={uuidv4()}><Image
                                                    width={160}
                                                    style={{ border: "1px solid rgba(0,0,0,.125)" }}
                                                    id={uuidv4()} src={image} fluid /></Col>
                                            ))}
                                            {review.videoCollection.map(video => (
                                                <Col md={3} id={uuidv4()}>
                                                    <ReactPlayer playing={true} light={true}
                                                        width={160}
                                                        style={{ border: "1px solid rgba(0,0,0,.125)" }}
                                                        controls={true}
                                                        height={120}
                                                        url={video} />
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
                                    : ""}
                            </Card.Body>
                        </Card>
                    ))
                }

            </div >
        );
    }
};


export default RecipeReview;