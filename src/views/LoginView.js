import { render } from "react-dom"
import React from "react"
import Login from '../components/LoginComponent/Login';
import UserService from '../services/UserService';

export class LoginView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    login(user) {
        UserService.login(user.username, user.password).then((data) => {
            const accounttype = UserService.getCurrentUser().accounttype;
            //console.log(accounttype);
            if (accounttype == 'chef') {
                this.props.history.push('/chef');
                //console.log('chef account');
            } else {
                this.props.history.push('/');
                //console.log('customer account');
            }

            window.location.reload();
            console.log('logged in successfully');
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
            <Login onSubmit={(user) => this.login(user)} error={this.state.error} />
        );
    }

}
