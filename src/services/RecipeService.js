"use strict";

import HttpService from './HttpService';
import axios from 'axios';

export default class RecipeService {

    constructor() {
    }

    static baseURL() { return "http://localhost:3000/recipes" }

    static getAll() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getNew() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/new/4`, function (data) {
                resolve(data);
                console.log("Received", data)
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getRecipesByChefID(chefID) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/chef/${chefID}`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }


    static getRecipe(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${RecipeService.baseURL()}/${id}`, function (data) {
                if (data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving movie');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }


    static deleteRecipe(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${RecipeService.baseURL()}/${id}`, function (data) {
                if (data.message != undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting');
                }
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateRecipe(recipe) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${recipe._id}`, recipe, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static createRecipe(recipe) {
        return new Promise((resolve, reject) => {
            var formData = new FormData();
            formData.append('title', recipe.title);
            formData.append('description', recipe.description);
            formData.append('createdByChef', recipe.createdByChef);
            formData.append('servingSize', recipe.servingSize);
            formData.append('difficulty', recipe.difficulty);
            formData.append('category', recipe.category);
            formData.append('recipeImageURL', recipe.recipeImageURL);
            axios.post(this.baseURL(), formData)
                .then(res => {
                    window.location = '/#chef/';
                })
                .catch(err => {
                    console.log(err);
                });
            /*HttpService.post(RecipeService.baseURL(), recipe, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });*/
        });
    }



    static getRecipeName(recipeId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/recipeName/${recipeId}`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

}