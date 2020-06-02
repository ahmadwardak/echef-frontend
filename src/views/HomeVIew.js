import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { RecipeList } from '../components/RecipeList';
import Axios from "axios";

export class HomeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [{ "title": "something" }],
            loading: false,
        }

    };



    componentWillMount() {
        this.setState({
            loading: true
        });

        RecipeService.getAll().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            })
        }).catch((e) => {
            console.error(e);
        });
    }






    //Home View
    render() {
        const recipes = this.state.data
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (<div>
            <h1>Home Page</h1>
            <ul> 
             <RecipeList recipes={recipes} />
        </ul>

        </div>
        );
    }

}
