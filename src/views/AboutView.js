import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Banner from '../components/HeaderComponent/Banner';
import '../App.css';
import headerSource from '../Assets/about-header.jpg';
import bigLogo from '../Assets/big-logo.png';
import '../App.css';
import recipeIcon from '../Assets/recipe.png';
import deliceryIcon from '../Assets/food-delivery.png';
import brandsIcon from '../Assets/brands.png';


export class AboutView extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <Banner pageTitle={this.props.title} recipeImageURL={headerSource}/>
                <div className="content">
                    <Container className='section'>
                        <Row>
                            <Col md={6}>
                                <Image src={bigLogo} width='400px' height='400px'/>
                            </Col>
                            <Col md={6}>
                            <div>
                            <h2>About eChef</h2>
                            <p className='text-justify'>
                                    eChef is a one-stop go-to platform to help individuals/households/organizers identify ingredients
                                    of a recipe and buy them in a single click to solve the issue of selecting and shopping ingredients
                                    for a food item, along with the food recipes to prepare the food item.
                            </p>
                            <p className='text-justify'>
                                Food is the most essential requirement for sustenance of human life. Therefore, any individual, household, event organizer, restaurants, or others having trouble in the preparation of food, specifically in identifying or shopping ingredients of a food recipe across different websites for a meal will be our key customers. Furthermore, people looking for food preparation guidelines for various cuisines will be our customers.
                            </p> 
                            <p className='text-justify'>
                                    Since food preparation is an everyday task, certain customers will be interested in getting the ingredients delivered on the same day and if possible, under a few hours as well. For this scenario, we would offer a premium version along with the free version to the customers. The free version covers the users who require food items delivered in standard time. 
                            </p>

                            </div>
                                

                            </Col>
                        </Row>
                        
                    </Container>
                    <Container className='section card'>
                        <Row className='card-header'>
                            <Col className="text-center">
                                <h1>-Our Values-</h1>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center section card-body">
                            <Col className="text-center" xs lg="4" >
                                <Image src={recipeIcon} width='64px' height='64px'/>
                                <br/>
                                <h4>Many different Recipes</h4>
                                <p>Chefs all around the world can sign up in this plaform and create their own recipes.</p>
                            </Col>
                            <Col className="text-center" xs lg="4" >
                                <Image src={deliceryIcon} width='64px' height='64px'/>
                                <br/>
                                <h4>Fast and Convenient</h4>
                                <p>You can get all the ingredients you need at your doorstep without going to the grocery stores.</p>
                            </Col>
                            <Col className="text-center" xs lg="4" >
                                <Image src={brandsIcon} width='64px' height='64px'/>
                                <br/>
                                <h4>Maximum Customization</h4>
                                <p>You can change the brand and amount of the ingredients amount based on the serving size or your need.</p>
                            </Col>
                        </Row>
                    </Container>


                </div>

            </div >
        );
    }

}


