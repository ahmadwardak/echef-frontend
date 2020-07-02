"use strict";

import HttpService from "./HttpService";

export default class UserService {

    constructor() {

    }

    static baseURL() { return "http://localhost:3000/auth"; }

    static register(user) {

        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, {
                username: user.username,
                password: user.password,
                email: user.email
            }, function (data) {
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
            email: JSON.parse(window.atob(base64)).email,
            accounttype: JSON.parse(window.atob(base64)).accounttype
        };
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}