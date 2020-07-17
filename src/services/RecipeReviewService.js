"use strict";

import HttpService from './HttpService';
import UserService from './UserService';
import axios from 'axios';

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
            var formData = new FormData();
            formData.append('heading', review.heading);
            formData.append('detail', review.detail);
            formData.append('recipe', recipeID);
            formData.append('addedbyUser', UserService.getCurrentUser()._id);
            formData.append('overallRating', review.overallRating);
            formData.append('qualityRating', review.qualityRating);
            formData.append('valueForMoneyRating', review.valueForMoneyRating);
            let aaa = [...review.fileCollection];
            aaa.forEach(file => {
                formData.append('fileCollection', file);
            })


            // formData.append('review', {
            //     heading: review.heading,
            //     addedbyUser: UserService.getCurrentUser()._id,
            //     recipe: recipeID,
            //     detail: review.detail,
            //     overallRating: review.overallRating,
            //     qualityRating: review.qualityRating,
            //     valueForMoneyRating: review.valueForMoneyRating,
            // });

            //console.log(review.fileCollection);
            //return false;
            let token = window.localStorage['jwtToken'];
            // if (!token) reject("aaa");

            axios.post(`${this.baseURL()}/${recipeID}`, formData, {
                headers: {
                    'Authorization': `JWT ${token}`
                }
            })
                .then(res => {
                    window.location = '/#recipe/' + res.data.recipeID;
                })
                .catch(err => {
                    console.log(err);
                });



            // HttpService.post(, formData, function (data) {
            //     resolve(data);
            // }, function (textStatus) {
            //     reject(textStatus);
            // });
        });
    }


}