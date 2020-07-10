"use strict";

import HttpService from './HttpService';

export default class RecipeService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000" }

    static getCategories(){
       return new Promise((resolve, reject) => {
           HttpService.get(`${this.baseURL()}/categories`, function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getCookingLevels(){
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/levels`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
     }
}