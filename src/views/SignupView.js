import { render } from "react-dom"
import React from "react"
import Signup from '../components/SignupComponent/Signup';
import UserService from '../services/UserService';

export class SignupView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    signup(user) {
        UserService.register(user).then((data) => {
            this.props.history.push('/');
            console.log('registered.....');
        }).catch(err => {
            console.error(err);
            this.setState({
                error: err
            });
        });
    }

    //Home View
    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (
            <Signup onSubmit={(user) => this.signup(user)} error={this.state.error} />
        );
    }

}
