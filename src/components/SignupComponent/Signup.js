import React, { Component } from 'react';
import { Card, Button, TextField } from 'react-md';
import './Signup.css';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            emailError: '',
            usernameError: '',
            passwordError: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validatePassword = this.validatePassword.bind(this);

    }

    handleChangeUsername(value) {
        this.setState({ username: value });
    }

    handleChangePassword(value) {
        this.setState({ password: value });
    }

    handleChangeEmail(value) {
        this.setState({ email: value });
    }


    validateEmail() {
        let email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email_pattern.test(this.state.email)) {
            this.setState({ emailError: '' });
        }
        else if (this.state.email === '') {
            this.setState({ emailError: 'Email is required' });
        }
        else {
            this.setState({ emailError: 'Invalid Email' });
        }
    }

    validateUsername() {
        let name_pattern = /^[a-zA-Z0-9_]*$/;
        if (name_pattern.test(this.state.username)) {
            this.setState({ usernameError: '' });
        }
        else if (this.state.username === '') {
            this.setState({ usernameError: 'Username required' });
        }
        else {
            this.setState({ usernameError: 'Invalid Username' });
        }
    }

    validatePassword() {
        let password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (password_pattern.test(this.state.password)) {
            this.setState({ passwordError: '' });
        }
        else if (this.state.password === '') {
            this.setState({ passwordError: 'Password required' });
        }
        else {
            this.setState({ passwordError: 'Password complexity (1 lowercase, 1 uppercase, 1 special character and minimum 8 length).' });
        }
    }


    handleSubmit(event) {
        event.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };
        this.props.onSubmit(user);
    }

    render() {
        return (

            <div className="row">
                <div className="col">
                    <Card className="md-block-centered loginStyle">
                        <form className="md-grid" onSubmit={this.handleSubmit} >
                            <TextField
                                label="Email"
                                id="Email"
                                type="email"
                                className="md-row"
                                required={true}
                                value={this.state.email}
                                error={this.state.emailError.length !== 0}
                                onChange={this.handleChangeEmail}
                                onBlur={this.validateEmail}
                                errorText={this.state.emailError} />

                            <TextField
                                label="Username"
                                id="Username"
                                type="text"
                                className="md-row"
                                required={true}
                                value={this.state.username}
                                error={this.state.usernameError.length !== 0}
                                onChange={this.handleChangeUsername}
                                onBlur={this.validateUsername}
                                errorText={this.state.usernameError} />


                            <TextField
                                label="Password"
                                id="Password"
                                type="password"
                                className="md-row"
                                required={true}
                                value={this.state.password}
                                error={this.state.passwordError.length !== 0}
                                onChange={this.handleChangePassword}
                                onBlur={this.validatePassword}
                                errorText={this.state.passwordError} />

                            <Button id="submit" type="submit"
                                raised primary className="md-cell md-cell--1">Register</Button>

                        </form>
                    </Card>

                </div>
            </div>
        );
    }
}

export default Signup;