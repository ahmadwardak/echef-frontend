import { render } from "react-dom"
import React from "react"

export class HomeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

//Home View
render(){
    if (this.state.loading) {
        return (<h2>Loading...</h2>);
    }
    return (
        <h1>Home Page</h1>
    );
    }
    
}
