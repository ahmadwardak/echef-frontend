import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { ChefViewList } from '../components/ChefComponent/ChefViewList';
import UserService from '../services/UserService'
import { Button, ListGroup, Card } from "react-bootstrap";
import Banner from '../components/HeaderComponent/Banner';

export class ChefView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
        }
        this.createRecipe = this.createRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
    };
    // Normal React component Lifecycle
    componentWillMount() {
        this.setState({
            loading: true
        });

        let chefID = UserService.getCurrentUser()._id;
        RecipeService.getRecipesByChefID(chefID).then((data) => {
            this.setState({
                data: [...data],
                loading: false
            })
        }).catch((e) => {
            console.error(e);
        });

    }

    createRecipe() {
        window.location = "/#add";
    }

    deleteRecipe(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });
        RecipeService.deleteRecipe(id).then((data) => {
            window.location = "/#chef";
            window.location.reload(false);
        }).catch((e) => window.confirm(e));

    }

    render() {

        if (this.state.loading) {
            return (<h3>Loading...</h3>);
        }

        return (
            <div>
                <Banner pageTitle={this.props.title} />
                <div className="content">
                    <Card>
                        <Card.Header as="h4">My recipes</Card.Header>
                        <Card.Body>
                            <ChefViewList recipes={this.state.data} onDelete={(id) => this.deleteRecipe(id)} />
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="success" onClick={this.createRecipe}>Create a new recipe</Button>
                        </Card.Footer>
                    </Card></div>
            </div>
        );
    }

}
