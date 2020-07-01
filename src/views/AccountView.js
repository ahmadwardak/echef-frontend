import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import UserService from '../services/UserService';

export class AccountView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: UserService.getCurrentUser(),
        }

    };

    goToEditAccount() {
        window.location = '/#editaccount';
    }



    render() {
        const rowBorder = {
            borderBottom: '1px solid #ccc',
            margin: '15px'
        };

        return (
            <div className="container">
                <div className="row" style={rowBorder}>
                    <div className="col-md-3">
                        Name:
                    </div>
                    <div className="col-md-9 text-left">{this.state.user.fullname}
                    </div>
                </div>
                <div className="row" style={rowBorder}>
                    <div className="col-md-3">
                        Username:
                    </div>
                    <div className="col-md-9 text-left">{this.state.user.username}
                    </div>
                </div>
                <div className="row" style={rowBorder}>
                    <div className="col-md-3">
                        Email:
                    </div>
                    <div className="col-md-9 text-left">{this.state.user.email}
                    </div>
                </div>
                <div className="row" style={rowBorder}>
                    <div className="col-md-3">
                        Account Type:
                    </div>
                    <div className="col-md-9 text-left">{this.state.user.accounttype}
                    </div>
                </div>
                <div className="row" style={rowBorder}>
                    <div className="col-md-3">
                        Subscription:
                    </div>
                    <div className="col-md-9 text-left">{this.state.user.subscriptiontype}
                    </div>
                </div>
                <div className="row" style={rowBorder}>
                    <div className="col-md-3">
                        Address:
                    </div>
                    <div className="col-md-9 text-left">{this.state.user.address}
                    </div>
                </div>
                <div className="row" style={rowBorder}>
                    <div className="col-md-3">
                        Shipping Address:
                    </div>
                    <div className="col-md-9 text-left">{this.state.user.shippingaddress}
                    </div>
                </div>
                <div className="row" style={rowBorder}>
                    <div className="col-md-3">
                        Billing Address:
                    </div>
                    <div className="col-md-9 text-left">{this.state.user.billingaddress}
                    </div>
                </div>
                <div style={{ height: '15px' }}></div>
                <div className="row">
                    <div className="col-md-3" style={{ margin: '0 15px' }}>
                        <Button variant="secondary" type="button" onClick={() => this.goToEditAccount()}>
                            Edit Detail
                    </Button>
                    </div>
                </div>
            </div>
        );
    }

}
