import React, { Component } from 'react';

import HeaderImage from '../../Assets/echef-home-header-image.jpeg';
import bigLogo from '../../Assets/echef-logo.png';
import RecipeHeader from '../../Assets/recipe-1.jpg';
import { Form, Button, Card, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundImage: 'url(' + RecipeHeader + ')'
        }

    }

    componentWillMount(props) {

        if (this.props.recipeImageURL !== undefined) {
            this.setState({ backgroundImage: 'url(' + this.props.recipeImageURL + ')' });
        }
    }

    render() {
        return (

            <div>
                {this.props.pageTitle == 'eChef Home' ?

                    <div>
                        <div className='header' style={{ backgroundImage: 'url(' + HeaderImage + ')', backgroundSize: 'cover', height: '400px' }}>
                            <div className='blackTransparency center'>
                                <div className="pt-3 text-light">
                                    <Row className="pb-3 mt-5">
                                        <Col xs={12} md={12} className=" d-flex justify-content-center">
                                            <Image src={bigLogo} width='90px' height='90px' />
                                        </Col>
                                    </Row>
                                    <Row className="pt-1">
                                        <Col xs={12} md={12} className="d-flex justify-content-center">
                                            <h4 className="text-uppercase text-weight-light">Welcome to eChef</h4>
                                        </Col>
                                    </Row>
                                    <Row className="pt-1">
                                        <Col xs={12} md={12} className="d-flex justify-content-center text-weight-light">
                                            <div className=" justify-content-center" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                <div className="item">eChef is a one-stop platform to identify ingredients </div>
                                                <div style={{ flexBasis: '100%', height: '0' }}> </div>
                                                <div className="item" >of a recipe and buy them in a single click.</div>
                                                <div style={{ flexBasis: '100%', height: '10px' }}> </div>
                                                <div className="item" >Learn more <Link to='/about'>about us</Link>.</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='header' style={{ backgroundImage: this.state.backgroundImage, backgroundSize: 'cover', height: '300px' }}>
                        <div className='blackTransparency'>
                            <h1 className='pageTitle font-weight-light'>{this.props.pageTitle}</h1>
                        </div>
                    </div>
                }</div>
        );
    }
}

export default Banner;