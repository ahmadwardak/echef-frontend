import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { RecipeList } from '../components/RecipeList';
import Categories from "../components/Categories";
import { Tags } from "../components/Tags";
import { Form, FormGroup, FormControl, Card, ListGroup, Container, Row, Col, Collapse, Button } from "react-bootstrap";
import Banner from '../components/HeaderComponent/Banner';

export class SearchView extends React.Component {

    constructor(props) {
        super(props);
        let categories = props.location.category || "All Categories";
        // console.log("Props location", props.location)
        let inputData = props.location.title || "";
        console.log("Categories", categories)
        this.state = {
            //data: [{ "title": "If you see this, the DB is not connected", "difficulty": "Easy", "_id": "FooBar", "category": "All Categories", "tags":"" }],
            data: [],
            loading: false,
            title: inputData,
            difficulty: "",
            category: categories,
            tags: [],
            showTags: true,
            activeTags: [],
            showFilters: false
        }
        //Connects the onChange event to the function
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleTags = this.toggleTags.bind(this);


    };
    // Normal React component Lifecycle
    componentWillMount(props) {
        //  console.log("Is this here",props.location.aboutProps.category)
        this.setState({
            loading: true
        });
        RecipeService.getAll().then((data) => {
            // Get all viable tags 
            let tempTags = data.reduce((tmp, tag) => {
                //  console.log(" Tag: ", tag.tags, tag._id)
                if (tag.tags)
                    return (tmp = [...tmp, ...tag.tags]);
                else {
                    return tmp = [...tmp];
                }
            }, [])
            //Remove duplicates
            tempTags = [...new Set(tempTags)]
            //console.log("tempTags",tempTags)
            this.setState({
                data: [...data],
                tags: tempTags,
                activeTags: tempTags,
                loading: false
            })
        }).catch((e) => {
            console.error(e);
        });
    }


    handleChange(event) {
        // console.log("", event.target.value, "checked", event.target.checked)
        let tmpTags = this.state.activeTags
        let value = event.target.value
        let checked = event.target.checked
        if (checked) {//Selecting: add a value
            this.setState({
                activeTags: [...this.state.activeTags, value]
            })
        }// Remove a value
        else {
            tmpTags = tmpTags.filter(tag => {
                //console.log("No want this:", value, "I am: ", tag)
                //console.log(tag === value)
                return (tag !== value)
            })
            this.setState({
                activeTags: [... new Set(tmpTags)]
            })
        }
    }
    // Handles the filter search
    handleSearchChange(event) {
        event.preventDefault()
        let nameVal = event.target.name // input name = "something"
        let val = event.target.value // something = value
        // console.log("nameVal", nameVal)
        // console.log("val", val)
        this.setState({
            [nameVal]: val  // this.state{something:value}
        })
    }
    toggleTags() {
        //console.log("showTags?", !this.state.showTags)
        let show = this.state.showTags
        this.setState({
            showTags: !show
        }
        )
    }


    //Home View
    render() {
        // console.log("Tags:", this.state.tags)
        const recipes = this.state.data.filter(recipe => {
            //console.log("This is a recipe", recipe["tags"])
            //console.log("Active tags", this.state.activeTags)
            if (this.state.category == "All Categories") {
                return (
                    recipe["title"].toLowerCase().includes(this.state.title.toLowerCase())
                    && recipe["difficulty"].includes(this.state.difficulty)
                    && recipe["tags"].some(r => this.state.activeTags.includes(r))

                )
            }
            else {
                return (
                    recipe["title"].toLowerCase().includes(this.state.title.toLowerCase())
                    && recipe["difficulty"].includes(this.state.difficulty)
                    && recipe["category"] == this.state.category
                    && recipe["tags"].some(r => this.state.activeTags.includes(r))
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
                                    <Row>
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
                                    </Row>
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
                                            <RecipeList recipes={recipes} />
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
