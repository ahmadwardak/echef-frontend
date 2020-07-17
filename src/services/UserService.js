"use strict";

import HttpService from "./HttpService";

export default class UserService {

    constructor() {

    }

    static baseURL() { return "http://localhost:3000/auth"; }

    static register(user) {

        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, {
                fullName: user.fullName,
                username: user.username,
                password: user.password,
                email: user.email,
                accountType: user.accountType,
                paymentOption: 'none',
                address: user.address,
                shippingAddress: user.shippingAddress,
                billingAddress: user.billingAddress,
                subscriptionType: 'normal',
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }


    static update(user) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${UserService.baseURL()}/update`, user, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(username, password) {

        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/login`, {
                username: username,
                password: password
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static logout() {
        window.localStorage.removeItem('jwtToken');
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let _id = JSON.parse(window.atob(base64))._id;
        return {
            _id,
            username: JSON.parse(window.atob(base64)).username,
            fullname: JSON.parse(window.atob(base64)).fullname,
            email: JSON.parse(window.atob(base64)).email,
            accounttype: JSON.parse(window.atob(base64)).accounttype,
            subscriptiontype: JSON.parse(window.atob(base64)).subscriptiontype,
            email: JSON.parse(window.atob(base64)).email,
            address: JSON.parse(window.atob(base64)).address,
            shippingaddress: JSON.parse(window.atob(base64)).shippingaddress,
            billingaddress: JSON.parse(window.atob(base64)).billingaddress,
        };
    }


    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}