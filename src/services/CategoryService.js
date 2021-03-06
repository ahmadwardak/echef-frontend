"use strict";

import HttpService from './HttpService';

export default class RecipeService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000" }

    //Sending HTTP Request to get all categories from the backend
    static getCategories(){
       return new Promise((resolve, reject) => {
           HttpService.get(`${this.baseURL()}/categories`, function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    //Sending HTTP Request to get all cooking levels from backend
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