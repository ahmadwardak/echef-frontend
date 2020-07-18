"use strict";

import HttpService from './HttpService';
import axios from 'axios';

export default class RecipeService {

    constructor() {
    }

    static baseURL() { return "http://localhost:3000/recipes" }

    //A HTTP Request sent to fetch all the recipes present in the backend
    static getAll() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.baseURL(), function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    //Fetch only the latest recipes
    static getNew() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/new/12`, function (data) {
                resolve(data);
                // console.log("Received", data)
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    // To fetch recipes created by a specific chef
    static getRecipesByChefID(chefID) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/chef/${chefID}`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    // Fetching a single recipe information
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

    //Deleting a recipe from the backend
    static deleteRecipe(id) {
        return new Promise((resolve, reject) => {
            let token = window.localStorage['jwtToken'];
            //reject(token);
            axios.delete(`${RecipeService.baseURL()}/${id}`, {
                headers: {
                    'Authorization': `JWT ${token}`
                }
            })
                .then(res => {
                    resolve('success');
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    // Updating the existing recipe with new information
    static updateRecipe(recipe) {
        return new Promise((resolve, reject) => {
            var formData = new FormData();
            formData.append('title', recipe.title);
            formData.append('description', recipe.description);
            formData.append('createdByChef', recipe.createdByChef);
            formData.append('servingSize', recipe.servingSize);
            formData.append('difficulty', recipe.difficulty);
            formData.append('category', recipe.category);
            formData.append('ingredients', JSON.stringify(recipe.ingredients));
            formData.append('recipeImageURL', recipe.recipeImageURL);
            // console.log(recipe.recipe._id);
            // console.log(...formData);

            let token = window.localStorage['jwtToken'];

            axios.put(`${RecipeService.baseURL()}/${recipe.recipe._id}`, formData, {
                headers: {
                    'Authorization': `JWT ${token}`
                }
            })
                .then(res => {
                    // console.log(res);
                    window.location = '/#chef/';
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    //Creating a new recipe
    static createRecipe(recipe) {
        return new Promise((resolve, reject) => {
            var formData = new FormData();
            formData.append('title', recipe.title);
            formData.append('description', recipe.description);
            formData.append('createdByChef', recipe.createdByChef);
            formData.append('servingSize', recipe.servingSize);
            formData.append('difficulty', recipe.difficulty);
            formData.append('category', recipe.category);
            formData.append('ingredients', JSON.stringify(recipe.ingredients));
            formData.append('recipeImageURL', recipe.recipeImageURL);

            let token = window.localStorage['jwtToken'];

            axios.post(this.baseURL(), formData, {
                headers: {
                    'Authorization': `JWT ${token}`
                }
            })
                .then(res => {
                    window.location = '/#chef/';
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    // To fetch just the name of a recipe
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