import React, { Component } from 'react';
import { Card, Button, TextField } from 'react-md';
import './Login.css';
import { Link } from 'react-router-dom';

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

    handleChangeUsername(value) {
        this.setState({ username: value });
    }

    handleChangePassword(value) {
        this.setState({ password: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('submit clicked');

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }

    render() {
        return (

            <div className="row">
                <div className="col">
                    <Card className="md-block-centered secondary ">
                        <form className="md-grid" onSubmit={this.handleSubmit} >
                            <TextField
                                label="Username"
                                id="username"
                                type="text"
                                className="md-row"
                                required={true}
                                value={this.state.username}
                                onChange={this.handleChangeUsername}
                                errorText="Username required" />
                            <TextField
                                label="Password"
                                id="password"
                                type="password"
                                className="md-row"
                                required={true} value={this.state.password}
                                onChange={this.handleChangePassword}
                                errorText="Password required" />

                            <Button id="submit" type="submit"
                                raised primary className="md-cell md-cell--1 md-btn md-btn--flat md-btn--text md-pointer--hover md-background--primary md-background--primary-hover md-inline-block">Login</Button>
                            <Link to={'/register'} className="md-cell md-cell--1 md-btn md-btn--flat md-btn--text md-pointer--hover md-background--secondary md-background--secondary-hover md-inline-block" >Sign Up</Link>
                        </form>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Login;