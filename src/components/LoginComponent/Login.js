import React, { Component } from 'react';
import { Form, Button, Col, } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'

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
            <Form onSubmit={this.handleSubmit} >
                <Form.Row className="align-items-center" >
                    <Col xs={7}>
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
                    <Col xs={7}>
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

export default Login;