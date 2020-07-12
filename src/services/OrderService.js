"use strict";

import HttpService from './HttpService';

export default class OrderService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/order" }

 

    static getOrderByUserId(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${OrderService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving movie');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }



   

    static createOrder(orderData) {
        return new Promise((resolve, reject) => {
            HttpService.post(OrderService.baseURL(), orderData, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}