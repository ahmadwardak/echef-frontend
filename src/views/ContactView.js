import React from "react";
import { Container, Row, Col, Card, Image, Nav } from "react-bootstrap";
import Banner from '../components/HeaderComponent/Banner';
import '../App.css';
import picture from '../Assets/recipe.png';
import Ahmad from '../Assets/Ahmad.jpeg';
import Assal from '../Assets/Assal.jpeg';
import  Manoj  from '../Assets/Manoj.png';
import Leo from '../Assets/Leonardo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


export class ContactView extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <Banner pageTitle={this.props.title} />
                <div className="content">
                    <Container>
                        <Row className='section'>
                            <Col>
                                <h1 className='text-center'>-Group 20-</h1>
                            </Col>
                            
                        </Row>
                        <Row className='teamSection justify-content-md-center'>
                        <Col md={5}>
                                <Card className='text-center'>
                                    <h4  className="card-header">Asal Nesar Noubari</h4>
                                    <div className='card-body'>
                                        <Image src={Assal} roundedCircle width='300px'/>
                                        <hr/>
                                        <span><h6>M.Sc Informatics</h6></span>
                                        <Nav.Link href="mailto:asal.nesar@tum.de">
                                            <FontAwesomeIcon icon={faEnvelope} size="lg" className='greenText' />
                                            <span className='greenText'>  asal.nesar@tum.de</span>
                                        </Nav.Link>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={5}>
                                <Card className='text-center'>
                                    <h4  className="card-header">Ahmad Rashid Wardak</h4>
                                    <div className='card-body'>
                                        <Image src={Ahmad} roundedCircle width='300px'/>
                                        <hr/>
                                        <span><h6>M.Sc Informatics</h6></span>
                                        <Nav.Link href="mailto:ge24kul@mytum.de">
                                            <FontAwesomeIcon icon={faEnvelope} size="lg" className='greenText' />
                                            <span className='greenText'>  ge24kul@mytum.de</span>
                                        </Nav.Link>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='teamSection justify-content-md-center'>
                            <Col md={5}>
                                <Card className='text-center'>
                                    <h4  className="card-header">Manoj Kumar Keerthy</h4>
                                    <div className='card-body'>
                                        <Image src={Manoj} roundedCircle width='300px'/>
                                        <hr/>
                                        <span><h6>M.Sc Informatics</h6></span>
                                        <Nav.Link href="mailto:ge82gop@mytum.de">
                                            <FontAwesomeIcon icon={faEnvelope} size="lg" className='greenText' />
                                            <span className='greenText'>  ge82gop@mytum.de</span>
                                        </Nav.Link>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={5}>
                                <Card className='text-center'>
                                    <h4  className="card-header">Leonardo Fraquelli </h4>
                                    <div className='card-body'>
                                        <Image src={Leo} roundedCircle width='300px'/>
                                        <hr/>
                                        <span><h6>M.Sc Informatics</h6></span>
                                        <Nav.Link href="mailto:ge37yoc@mytum.de">
                                            <FontAwesomeIcon icon={faEnvelope} size="lg" className='greenText' />
                                            <span className='greenText'>  ge37yoc@mytum.de</span>
                                        </Nav.Link>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Container>


                </div>

            </div >
        );
    }

}


