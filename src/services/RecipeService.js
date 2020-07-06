"use strict";

import HttpService from './HttpService';

export default class RecipeService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/recipes" }

    static getAll(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getRecipesByChefID(chefID){
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/chef/${chefID}`,function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
     }
    

    static getRecipe(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${RecipeService.baseURL()}/${id}`, function(data) {
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
    

    static deleteRecipe(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${RecipeService.baseURL()}/${id}`, function(data) {
                if(data.message != undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateRecipe(recipe) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${recipe._id}`, recipe, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static createRecipe(recipe) {
        return new Promise((resolve, reject) => {
            HttpService.post(RecipeService.baseURL(), recipe, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}