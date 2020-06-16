"use strict";

import HttpService from './HttpService';

export default class RecipeService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/categories" }

    static getCategories(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }
}