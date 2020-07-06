import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Button, Col, } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import Rating from 'react-rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import RecipeReviewService from '../../services/RecipeReviewService';

class RecipeReviewForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            heading: '',
            detail: '',
            overallRating: '',
            qualityRating: '',
            valueForMoneyRating: '',
            fileCollection: '',
            headingError: '',
            detailError: '',
            overallRatingError: '',
            qualityRatingError: '',
            valueForMoneyRatingError: '',
            hasError: false,
        };



        this.overallRating = React.createRef();
        this.qualityRating = React.createRef();
        this.valueForMoneyRating = React.createRef();
        this.fileCollection = React.createRef();

        this.handleChangeHeading = this.handleChangeHeading.bind(this);
        this.handleChangeDetail = this.handleChangeDetail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handleChangeHeading(event) {
        this.setState({ heading: event.target.value });
        // console.log(event.target.value);
    }
    handleChangeDetail(event) {
        this.setState({ detail: event.target.value });
        // console.log(event.target.value);
    }



    validateHeading() {
        if (this.state.heading !== "") {
            this.setState({ headingError: '' });
            this.setState({ hasError: false });
        }
        else if (this.state.heading === '') {
            this.setState({ headingError: 'Heading required' });
            this.setState({ hasError: true });
        }
    }
    validateDetail() {
        if (this.state.detail !== "") {
            this.setState({ detailError: '' });
            this.setState({ hasError: false });
        }
        else if (this.state.detail === '') {
            this.setState({ detailError: 'Detail required' });
            this.setState({ hasError: true });
        }
    }
    validateOverallRating() {
        if (this.state.overallRating !== "") {
            this.setState({ overallRatingError: '' });
            this.setState({ hasError: false });
        }
        else if (this.state.overallRating === '') {
            this.setState({ overallRatingError: 'Overall Rating required' });
            this.setState({ hasError: true });
        }
    }


    handleSubmit(event) {
        event.preventDefault();

        if (this.state.hasError == 'true') {
            return false;
        } else {
            //console.log(this.fileCollection.current.files);
            // return false;
            let review = {
                heading: this.state.heading,
                detail: this.state.detail,
                overallRating: this.state.overallRating,
                qualityRating: this.state.qualityRating,
                valueForMoneyRating: this.state.valueForMoneyRating,
                fileCollection: this.fileCollection.current.files,
            };
            const recipeId = this.props.match.params.id;
            RecipeReviewService.createReview(recipeId, review).catch((e) => window.confirm(e));

            // console.log('submitted');
        }
    }

    validate() {
        const overallRatingValue = this.overallRating.current.value;
        this.setState({ overallRating: overallRatingValue });
        // console.log(overallRatingValue);
        const qualityRatingValue = this.qualityRating.current.value;
        this.setState({ qualityRating: qualityRatingValue });
        // console.log(qualityRatingValue);
        const valueForMoneyRatingValue = this.valueForMoneyRating.current.value;
        this.setState({ valueForMoneyRating: valueForMoneyRatingValue });
        // console.log(valueForMoneyRatingValue);


        this.validateHeading();
        this.validateDetail();

    }

    render() {
        return (

            <Form onSubmit={this.handleSubmit} >
                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="heading">
                            <Form.Label>Heading</Form.Label>
                            <Form.Control type="text"
                                placeholder="Heading"
                                required
                                className={this.state.headingError ? "form-control is-invalid" : "form-control"}
                                defaultValue={this.state.heading}
                                onChange={this.handleChangeHeading} />
                            <div
                                className={this.state.headingError !== "" ? "inline-errormsg" : "hide-error"}>
                                {this.state.headingError}
                            </div>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="detail">
                            <Form.Label>Detail</Form.Label>
                            <Form.Control type="text"
                                placeholder="Detail"
                                required
                                className={this.state.detailError ? "form-control is-invalid" : "form-control"}
                                defaultValue={this.state.detail}
                                onChange={this.handleChangeDetail} />
                            <div
                                className={this.state.detailError !== "" ? "inline-errormsg" : "hide-error"}>
                                {this.state.detailError}
                            </div>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="overallRating">
                            <Form.Label>Overall Rating</Form.Label>
                            <Form.Control type="hidden"
                                placeholder="Overall"
                                readOnly
                                defaultValue={0}
                                ref={this.overallRating}
                                required />
                            <div className="float-right">
                                <Rating style={{ color: 'green' }}
                                    emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
                                    fullSymbol={<FontAwesomeIcon icon={faStar} />}
                                    fractions={2}
                                    initialRating={this.state.overallRating}
                                    onChange={(rate) => document.getElementById('overallRating').value = rate}
                                    required
                                />
                            </div>
                        </Form.Group>
                    </Col>
                </Form.Row>


                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="qualityRating">
                            <Form.Label>Qualtiy</Form.Label>
                            <Form.Control type="hidden"
                                placeholder="Quality"
                                readOnly
                                defaultValue={0}
                                ref={this.qualityRating}
                                required />
                            <div className="float-right">
                                <Rating style={{ color: 'green' }}
                                    emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
                                    fullSymbol={<FontAwesomeIcon icon={faStar} />}
                                    fractions={2}
                                    initialRating={this.state.qualityRating}
                                    onChange={(rate) => document.getElementById('qualityRating').value = rate}
                                    required
                                />
                            </div>
                        </Form.Group>
                    </Col>
                </Form.Row>


                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="valueForMoneyRating">
                            <Form.Label>Value for Money</Form.Label>
                            <Form.Control type="hidden"
                                placeholder="Value for Money"
                                readOnly
                                defaultValue={0}
                                ref={this.valueForMoneyRating}
                                required />
                            <div className="float-right">
                                <Rating style={{ color: 'green' }}
                                    emptySymbol={<FontAwesomeIcon icon={faStarEmpty} />}
                                    fullSymbol={<FontAwesomeIcon icon={faStar} />}
                                    fractions={2}
                                    initialRating={this.state.valueForMoneyRating}
                                    onChange={(rate) => document.getElementById('valueForMoneyRating').value = rate}
                                    required
                                />
                            </div>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group>
                            <Form.File
                                className="position-relative"
                                multiple
                                accept=".jpg,.gif,.png,.jpeg,.mp4,.avi,.mov,.wmv"
                                ref={this.fileCollection}
                                onChange={this.handleChangeFileCollection}
                                name="fileCollection"
                                label="Add photo(s) or Video(s)"
                                id="fileCollection"

                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center">
                    <Col xs="auto">
                        <Button variant="primary" onClick={() => this.validate()} type="submit">
                            Add Review
                    </Button>
                    </Col>
                </Form.Row>
                <br></br>
                {this.props.error ? <Form.Row>
                    <Col xs="auto">
                        <Alert variant="danger">
                            <Alert.Heading>Error!</Alert.Heading>
                            <p>
                                {this.props.error}
                            </p>
                        </Alert>
                    </Col>
                </Form.Row>
                    : ''}

            </Form>
        );
    }
}

export default withRouter(RecipeReviewForm);