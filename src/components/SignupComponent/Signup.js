import React, { Component } from 'react';
import { Form, Button, Col, } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'

import './Signup.css';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            username: '',
            accountType: '',
            password: '',
            email: '',
            address: '',
            shippingAddress: '',
            billingAddress: '',
            hasError: false,
            fullNameError: '',
            emailError: '',
            usernameError: '',
            accountTypeError: '',
            passwordError: ''
        };

        this.handleChangeFullName = this.handleChangeFullName.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeAccountType = this.handleChangeAccountType.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeShippingAddress = this.handleChangeShippingAddress.bind(this);
        this.handleChangeBillingAddress = this.handleChangeBillingAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateFullName = this.validateFullName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateAccountType = this.validateAccountType.bind(this);

    }

    handleChangeFullName(event) {
        this.setState({ fullName: event.target.value });
    }
    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    handleChangeAccountType(event) {
        this.setState({ accountType: event.target.value });
    }
    handleChangeAddress(event) {
        this.setState({ address: event.target.value });
    }
    handleChangeShippingAddress(event) {
        this.setState({ shippingAddress: event.target.value });
    }
    handleChangeBillingAddress(event) {
        this.setState({ billingAddress: event.target.value });
    }


    validateEmail() {
        let email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email_pattern.test(this.state.email)) {
            this.setState({ emailError: '' });
            this.setState({ hasError: false });
        }
        else if (this.state.email === '') {
            this.setState({ emailError: 'Email is required' });
            this.setState({ hasError: true });
        }
        else {
            this.setState({ emailError: 'Invalid Email' });
            this.setState({ hasError: true });
        }
    }

    validateUsername() {
        let name_pattern = /^[a-zA-Z0-9_]*$/;
        if (name_pattern.test(this.state.username)) {
            this.setState({ usernameError: '' });
            this.setState({ hasError: false });
        }
        else if (this.state.username === '') {
            this.setState({ usernameError: 'Username required' });
            this.setState({ hasError: true });
        }
        else {
            this.setState({ usernameError: 'Invalid Username' });
            this.setState({ hasError: true });
        }
    }


    validateFullName() {
        if (this.state.fullName !== "") {
            this.setState({ fullNameError: '' });
            this.setState({ hasError: false });
        }
        else if (this.state.fullName === '') {
            this.setState({ fullNameError: 'Name required' });
            this.setState({ hasError: true });
        }
    }

    validateAccountType() {
        if (this.state.accountType !== "") {
            this.setState({ accountTypeError: '' });
            this.setState({ hasError: false });
        }
        else {
            this.setState({ accountTypeError: 'Account Type required' });
            this.setState({ hasError: true });
        }
    }

    validatePassword() {
        let password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (password_pattern.test(this.state.password)) {
            this.setState({ passwordError: '' });
            this.setState({ hasError: false });
        }
        else if (this.state.password === '') {
            this.setState({ passwordError: 'Password required' });
            this.setState({ hasError: true });
        }
        else {
            this.setState({ passwordError: 'Password complexity (1 lowercase, 1 uppercase, 1 special character and minimum 8 length).' });
            this.setState({ hasError: true });
        }
    }


    handleSubmit(event) {
        event.preventDefault();


        if (this.state.hasError) {
            return false;
        } else {

            let user = {
                fullName: this.state.fullName,
                username: this.state.username,
                password: this.state.password,
                accountType: this.state.accountType,
                email: this.state.email,
                address: this.state.address,
                shippingAddress: this.state.shippingAddress,
                billingAddress: this.state.billingAddress,
            };
            this.props.onSubmit(user);
        }
    }

    validate() {
        this.validateAccountType();
        this.validateEmail();
        this.validateFullName();
        this.validateUsername();
        this.validatePassword();
    }

    render() {
        return (

            <Form onSubmit={this.handleSubmit} >
                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="fullName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Name"
                                required
                                className={this.state.fullNameError ? "form-control is-invalid" : "form-control"}
                                defaultValue={this.state.fullName}
                                onChange={this.handleChangeFullName} />
                            <div
                                className={this.state.fullNameError !== "" ? "inline-errormsg" : "hide-error"}>
                                {this.state.fullNameError}
                            </div>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text"
                                placeholder="Email"
                                required
                                className={this.state.emailError ? "form-control is-invalid" : "form-control"}
                                defaultValue={this.state.email}
                                onChange={this.handleChangeEmail} />
                            <div
                                className={this.state.emailError !== "" ? "inline-errormsg" : "hide-error"}>
                                {this.state.emailError}
                            </div>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                placeholder="Username"
                                required
                                className={this.state.usernameError ? "form-control is-invalid" : "form-control"}
                                defaultValue={this.state.username}
                                onChange={this.handleChangeUsername} />
                            <div
                                className={this.state.usernameError !== "" ? "inline-errormsg" : "hide-error"}>
                                {this.state.usernameError}
                            </div>
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
                                className={this.state.passwordError ? "form-control is-invalid" : "form-control"}
                                defaultValue={this.state.password}
                                onChange={this.handleChangePassword} />
                            <div
                                className={this.state.passwordError !== "" ? "inline-errormsg" : "hide-error"}>
                                {this.state.passwordError}
                            </div>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="accountType">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control as="select"
                                required
                                className={this.state.accountTypeError ? "form-control is-invalid" : "form-control"}
                                onChange={this.handleChangeAccountType} >
                                <option value="">Select Account Type</option>
                                <option value="chef">Chef</option>
                                <option value="customer">Customer</option>
                            </Form.Control>
                            <div
                                className={this.state.accountTypeError !== "" ? "inline-errormsg" : "hide-error"}>
                                {this.state.accountTypeError}
                            </div>
                        </Form.Group>

                    </Col>
                </Form.Row>

                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text"
                                placeholder="Address"
                                className="form-control"
                                defaultValue={this.state.address}
                                onChange={this.handleChangeAddress} />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="shippingAddress">
                            <Form.Label>Shipping Address</Form.Label>
                            <Form.Control type="text"
                                placeholder="Shipping Address"
                                className="form-control"
                                defaultValue={this.state.shippingAddress}
                                onChange={this.handleChangeShippingAddress} />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row className="align-items-center" >
                    <Col xs={7}>
                        <Form.Group controlId="billingAddress">
                            <Form.Label>Billing Address</Form.Label>
                            <Form.Control type="text"
                                placeholder="Billing Address"
                                className="form-control"
                                defaultValue={this.state.billingAddress}
                                onChange={this.handleChangeBillingAddress} />
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row className="align-items-center">
                    <Col xs="auto">
                        <Button variant="primary" onClick={() => this.validate()} type="submit">
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

export default Signup;