import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { RecipeList } from '../components/RecipeList';
import Categories from "../components/Categories";
// import { Tags } from "../components/Tags";
import { Form, FormGroup, FormControl, Card, ListGroup, Container, Row, Col, Collapse, Button } from "react-bootstrap";
import Banner from '../components/HeaderComponent/Banner';
/* SearchView handles all the searching needs.
Passing props are category and title, which allow users to initiate the search from the navigation bar or from the proposed recipes
in the home page.

OnMounting, SearchView will load the recipes in the DB and show them accordingly to the existing filters
Most of the Filter events are handled with the single handleSearchChange function*/
export class SearchView extends React.Component {

    constructor(props) {
        super(props);
        let categories = props.location.category || "All Categories";
        let inputData = props.location.title || "";
        this.state = {
            data: [],
            loading: false,
            title: inputData,
            difficulty: "",
            category: categories,
            //Tags, while working, are not being used
            // tags: [],
            // showTags: true,
            // activeTags: [],
            showFilters: false
        }
        //Connects the onChange event to the function
        this.handleSearchChange = this.handleSearchChange.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.toggleTags = this.toggleTags.bind(this);


    };
    // Normal React component Lifecycle
    componentWillMount() {
        this.setState({
            loading: true
        });
        RecipeService.getAll().then((data) => {
            //Tags, while working, are not being used
            // Get all viable tags 
            // let tempTags = data.reduce((tmp, tag) => {
            //     if (tag.tags)
            //         return (tmp = [...tmp, ...tag.tags]);
            //     else {
            //         return tmp = [...tmp];
            //     }
            // }, [])
            // //Remove duplicates
            // tempTags = [...new Set(tempTags)]
            this.setState({
                data: [...data],
                // tags: tempTags,
                // activeTags: tempTags,
                loading: false
            })
        }).catch((e) => {
            console.error(e);
        });
    }

    //Tags, while working, are not being used
    // handleChange(event) {
    //     // console.log("", event.target.value, "checked", event.target.checked)
    //     // let tmpTags = this.state.activeTags
    //     let value = event.target.value
    //     let checked = event.target.checked
    //     if (checked) {//Selecting: add a value
    //         this.setState({
    //             activeTags: [...this.state.activeTags, value]
    //         })
    //     }// Remove a value
    //     else {
    //         tmpTags = tmpTags.filter(tag => {
    //             //console.log("No want this:", value, "I am: ", tag)
    //             //console.log(tag === value)
    //             return (tag !== value)
    //         })
    //         this.setState({
    //             activeTags: [... new Set(tmpTags)]
    //         })
    //     }
    // }
    // Handles the filter search
    handleSearchChange(event) {
        event.preventDefault()
        let nameVal = event.target.name // input name = "something"
        let val = event.target.value // something = value
        this.setState({
            [nameVal]: val  
        })
    }

    //Tags, while working, are not being used
    // toggleTags() {
    //     //console.log("showTags?", !this.state.showTags)
    //     let show = this.state.showTags
    //     this.setState({
    //         showTags: !show
    //     }
    //     )
    // }


    render() {
        const recipes = this.state.data.filter(recipe => {
            if (this.state.category == "All Categories") {
                return (
                    recipe["title"].toLowerCase().includes(this.state.title.toLowerCase())
                    && recipe["difficulty"].includes(this.state.difficulty)
                    // && recipe["tags"].some(r => this.state.activeTags.includes(r))
                )
            }
            else {
                return (
                    recipe["title"].toLowerCase().includes(this.state.title.toLowerCase())
                    && recipe["difficulty"].includes(this.state.difficulty)
                    && recipe["category"] == this.state.category
                    // && recipe["tags"].some(r => this.state.activeTags.includes(r))
                )
            }
        })
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (
            <div>
                <Banner pageTitle={this.props.title} />
                <div className="p-4">
                    <Row>
                        <Col xs={12} md={3} className="mb-3">
                            <Card>
                                <Card.Header className="bg-primary text-white">
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <h5 className="m-1  font-weight-light">
                                                Filter the Recipes</h5>
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body className="bg-light">
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <Form.Group>
                                                <Form.Control
                                                // Handle recipe Titles
                                                    type="text" className="filterInput" name="title"
                                                    value={this.state.title}
                                                    placeholder="Filter recipes" onChange={this.handleSearchChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <Form.Group>
                                                <Form.Control as="select" onChange={this.handleSearchChange} name="difficulty">
                                                    <option value="">Any Difficulty</option>
                                                    <option value="Easy">Easy</option>
                                                    <option value="Intermediate">Intermediate</option>
                                                    <option value="Hard">Hard</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <Categories value={this.state.category} name="categories" onChange={this.handleSearchChange} />

                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        //Tags, while working, are not being used
                                        <Col xs={12} md={12}>
                                            <Form.Group>
                                                <Button variant="primary btn-block" onClick={this.toggleTags}>
                                                    Toggle Tags
                                                </Button>
                                                <div className="mt-2" id="showTags">
                                                    {this.state.showTags ?
                                                        <Tags tags={this.state.tags} onChange={this.handleChange} />
                                                        : null}
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row> */}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={9}>
                            <Row >
                                <Col xs={12} md={12}>
                                    <Card>
                                        <Card.Header className="bg-success text-white">
                                            <Row>
                                                <Col xs={12} md={12}>
                                                    <h5 className="m-1  font-weight-light">
                                                        Search Result</h5>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body className="bg-light">
                                            {recipes.length > 0 ? <RecipeList recipes={recipes} /> : <span> No results are available :(</span>}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div></div>
        );
    }

}
