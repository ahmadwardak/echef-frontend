import { render } from "react-dom"
import React from "react"
import AccountDetail from '../components/AccountDetailComponent/AccountDetail';
import UserService from '../services/UserService';
import Banner from '../components/HeaderComponent/Banner';

export class AccountDetailView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    update(user) {
        UserService.update(user).then((data) => {

            UserService.logout();

            window.location = '/#login';
            window.location.reload(false);
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
            <div>
                <Banner pageTitle={this.props.title} />
                <div className="content">
                    <AccountDetail onSubmit={(user) => this.update(user)} error={this.state.error} /></div></div>
        );
    }

}
