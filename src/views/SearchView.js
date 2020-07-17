import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { RecipeList } from '../components/RecipeList';
import Categories from "../components/Categories";
import { Tags } from "../components/Tags";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup"
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
            category:   categories,
            tags: [],
            showTags: true,
            activeTags: []
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
                if(tag.tags)
                    return (tmp = [...tmp, ...tag.tags]);
                else{
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
                <div className="content">
                    <Container fluid>
                        <Row xs={1} >
                            <Col key={1} xs={6} md={4} style={{ width: "20vw" }}  >
                                <ListGroup as="ul">
                                    <ListGroup.Item as="li" active>
                                        <h2>Filter the Recipes based on input</h2> <br></br>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" >
                                        <input
                                            type="text" className="filterInput" name="title"
                                            value={this.state.title}
                                            placeholder="Filter recipes" onChange={this.handleSearchChange}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" >
                                        <select onChange={this.handleSearchChange} name="difficulty">
                                            <option value="">Any Difficulty</option>
                                            <option value="Easy">Easy</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Hard">Hard</option>
                                        </select>
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" >
                                        <Categories value={this.state.category} name="categories" onChange={this.handleSearchChange} />
                                    </ListGroup.Item>
                                    <ListGroup.Item as="li" >
                                        <button onClick={this.toggleTags}>
                                            Toggle Tags
                                    </button>
                                        <div id="showTags">
                                            {this.state.showTags ? <ul>
                                                <Tags tags={this.state.tags} onChange={this.handleChange} />
                                            </ul> : null}
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col key={2} xs={6} md={8} style={{ width: "80vw" }}>
                                <Card >
                                    <h1>Search Results</h1>
                                    <RecipeList recipes={recipes} />
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div></div>
        );
    }

}
