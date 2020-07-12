"use strict";

import HttpService from './HttpService';

export default class ShoppingCartService {

    constructor(){
        
    }

    static baseURL() {return "http://localhost:3000/shoppingCart" }

 

    static getShoppingCartByUserId(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ShoppingCartService.baseURL()}/${id}`, function(data) {
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



    static updateShoppingCart(shoppingCart) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${shoppingCart._id}`, shoppingCart, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static createShoppingCart(shoppingCart) {
        return new Promise((resolve, reject) => {
            HttpService.post(ShoppingCartService.baseURL(), shoppingCart, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}