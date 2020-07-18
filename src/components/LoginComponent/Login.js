import React, { Component } from 'react';
import { Form, Button, Card, Row, Col, Image } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import bigLogo from '../../Assets/big-logo.png';

import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }



    handleSubmit(event) {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);

        console.log('submit clicked');

    }
    goToRegister() {
        window.location = '/#register';
    }

    render() {
        return (
            <Row>
                <Col xs={12} md={6} className="font-weight-light">

                    <Row className="pb-3">
                        <Col xs={12} md={12} className=" d-flex justify-content-center">
                            <Image src={bigLogo} width='90px' height='90px' />
                        </Col>
                    </Row>
                    <Row className="pt-1">
                        <Col xs={12} md={12} className="d-flex justify-content-center">
                            <h4 className="text-uppercase">Welcome to eChef</h4>
                        </Col>
                    </Row>
                    <Row className="pt-1">
                        <Col xs={12} md={12} className="d-flex justify-content-center">
                            <div className=" justify-content-center" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div className="item">
                                    <span style={{ color: 'green' }}>eChef</span> is a one-stop go-to platform to identify ingredients </div>
                                <div style={{ flexBasis: '100%', height: '0' }}> </div>
                                <div className="item" >of recipe and buy in a single click.</div>
                                <div style={{ flexBasis: '100%', height: '10px' }}> </div>
                                <div className="item" >Learn more <Link to='/about'>about us</Link>.</div>
                            </div>
                        </Col>
                    </Row>
                </Col >
                <Col xs={12} md={6}>
                    <Card><Card.Body style={{ padding: '3em' }}>
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Row className="align-items-center" >
                                <Col xs={12}>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text"
                                            placeholder="Username"
                                            required
                                            defaultValue={this.state.username}
                                            onChange={this.handleChangeUsername} />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row className="align-items-center">
                                <Col xs={12}>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            required
                                            defaultValue={this.state.password}
                                            onChange={this.handleChangePassword} />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row className="align-items-center">
                                <Col xs="auto">
                                    <Button variant="primary" type="submit">
                                        Login
                            </Button>
                                </Col>
                                <Col xs="auto">
                                    <Button variant="secondary" type="button" onClick={() => this.goToRegister()}>
                                        Register
                            </Button>
                                </Col>
                            </Form.Row>
                            <br></br>
                            {this.props.error ? <Form.Row>
                                <Col xs="auto">
                                    <Alert variant="danger">
                                        <Alert.Heading>Error!</Alert.Heading>
                                        <p className="mb-0">
                                            {this.props.error}
                                        </p>
                                    </Alert>
                                </Col>
                            </Form.Row>
                                : ''}
                        </Form>
                    </Card.Body></Card>
                </Col>
            </Row >
        );
    }
}

export default Login;