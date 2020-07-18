import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, Button, Row, Col, } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

import Rating from 'react-rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import RecipeService from '../../services/RecipeService';
import RecipeReviewService from '../../services/RecipeReviewService';

class RecipeReviewForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipeTitle: '',
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


    componentWillMount(props) {
        let id = this.props.match.params.id;
        RecipeService.getRecipeName(id).then((data) => {
            this.setState({ recipeTitle: data.title })
        }).catch((e) => {
            console.error(e);
        });
        // console.log(id)
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

            <div className="container-fluid">

                <Row className="pb-2">
                    <Col xs={12} md={12}>
                        <h4 >{this.state.recipeTitle}</h4>
                    </Col>
                </Row>
                <Row className="pb-2">
                    <Col xs={12} md={12}>

                        <Form onSubmit={this.handleSubmit} >

                            <Row className="py-2">
                                <Col xs={12} md={12}>
                                    <Form.Group className="my-0" controlId="heading">
                                        <Form.Label>Heading</Form.Label>
                                        <Form.Control type="text"
                                            placeholder="What's most important to know?"
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
                            </Row>
                            <Row className="py-2">
                                <Col xs={12} md={12}>
                                    <Form.Group className="my-0" controlId="detail">
                                        <Form.Label>Detail</Form.Label>
                                        <Form.Control type="text"
                                            placeholder="What do you like or dislike?"
                                            required
                                            as="textarea" rows="3"
                                            className={this.state.detailError ? "form-control is-invalid" : "form-control"}
                                            defaultValue={this.state.detail}
                                            onChange={this.handleChangeDetail} />
                                        <div
                                            className={this.state.detailError !== "" ? "inline-errormsg" : "hide-error"}>
                                            {this.state.detailError}
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={6}>

                                    <Row className="py-1">
                                        <Col xs={12} md={12} className=" p-0 my-0" >
                                            <Form.Group className="col-12 p-0 my-0" controlId="overallRating">
                                                <Form.Label className="col-6 my-0">Overall Rating</Form.Label>
                                                <Form.Control type="hidden"
                                                    placeholder="Overall"
                                                    readOnly
                                                    defaultValue={0}
                                                    ref={this.overallRating}
                                                    required />
                                                <div className="col-6 float-right text-right">
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
                                    </Row>

                                    <Row className="py-1">
                                        <Col xs={12} md={12} className=" p-0 my-0" >
                                            <Form.Group className="col-12 p-0 my-0" controlId="qualityRating">
                                                <Form.Label className="col-6 my-0">Qualtiy</Form.Label>
                                                <Form.Control type="hidden"
                                                    placeholder="Quality"
                                                    readOnly
                                                    defaultValue={0}
                                                    ref={this.qualityRating}
                                                    required />
                                                <div className="col-6 float-right text-right">
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
                                    </Row>

                                    <Row className="py-1">
                                        <Col xs={12} md={12} className=" p-0 my-0" >
                                            <Form.Group className="col-12 p-0 my-0" controlId="valueForMoneyRating">
                                                <Form.Label className="col-6 my-0">Value for Money</Form.Label>
                                                <Form.Control type="hidden"
                                                    placeholder="Value for Money"
                                                    readOnly
                                                    defaultValue={0}
                                                    ref={this.valueForMoneyRating}
                                                    required />
                                                <div className="col-6 float-right text-right">
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
                                    </Row>
                                </Col>


                                <Col xs={12} md={6}>
                                    <Form.Group className="my-0" >
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
                            </Row>

                            <Row className="py-2">
                                <Col xs="auto">
                                    <Button variant="primary" onClick={() => this.validate()} type="submit">
                                        Add Review
                    </Button>
                                </Col>
                            </Row>
                            <br></br>
                            {this.props.error ? <Row>
                                <Col xs="auto">
                                    <Alert variant="danger">
                                        <Alert.Heading>Error!</Alert.Heading>
                                        <p>
                                            {this.props.error}
                                        </p>
                                    </Alert>
                                </Col>
                            </Row>
                                : ''}

                        </Form>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default withRouter(RecipeReviewForm);