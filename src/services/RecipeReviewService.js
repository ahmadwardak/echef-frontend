"use strict";

import HttpService from './HttpService';
import UserService from './UserService';

export default class RecipeReviewService {

    constructor() {
    }

    static baseURL() { return "http://localhost:3000/reviews" }

    static getReviews(recipeID) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/${recipeID}`, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static getReview(recipeID) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${RecipeService.baseURL()}/${recipeID}`, function (data) {
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

    static createReview(recipeID, review) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${this.baseURL()}/${recipeID}`, {
                heading: review.heading,
                addedbyUser: UserService.getCurrentUser()._id,
                recipe: recipeID,
                detail: review.detail,
                overallRating: review.overallRating,
                qualityRating: review.qualityRating,
                valueForMoneyRating: review.valueForMoneyRating,
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }


}