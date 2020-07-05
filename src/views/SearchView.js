import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { RecipeList } from '../components/RecipeList';
import Categories from "../components/Categories";
import { Tags } from "../components/Tags";

export class SearchView extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            //data: [{ "title": "If you see this, the DB is not connected", "difficulty": "Easy", "_id": "FooBar", "category": "All Categories", "tags":"" }],
            data: [],
            loading: false,
            title: "",
            difficulty: "",
            category: "All Categories",
            tags: ["uuh"],
            showTags: true,
            activeTags: []
        }
        //Connects the onChange event to the function
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleTags = this.toggleTags.bind(this);


    };
    // Normal React component Lifecycle
    componentWillMount() {
        this.setState({
            loading: true
        });
        RecipeService.getRecipes().then((data) => {
            // Get all viable tags 
            let tempTags = data.reduce((tmp, tag) => {
                // console.log("Tmp:", tmp, " Tag: ",tag.tags)
                return (tmp = [...tmp, ...tag.tags])
            }, [])
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
        let show=this.state.showTags
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
                    recipe["title"].includes(this.state.title)
                    && recipe["difficulty"].includes(this.state.difficulty)
                    && recipe["tags"].some(r => this.state.activeTags.includes(r))

                )
            }
            else {
                return (
                    recipe["title"].includes(this.state.title)
                    && recipe["difficulty"].includes(this.state.difficulty)
                    && recipe["category"] == this.state.category
                    && recipe["tags"].some(r => this.state.activeTags.includes(r))
                )
            }
        })
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (<div>
            <div>
                <h2>Filter the Recipes based on input</h2> <br></br>

                <input
                    type="text" className="filterInput" name="title"
                    placeholder="Filter recipes" onChange={this.handleSearchChange}
                />

                <select onChange={this.handleSearchChange} name="difficulty">
                    <option value="">Any Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Hard">Hard</option>
                </select>

                <Categories name="categories" onChange={this.handleSearchChange} />
                <button onClick={this.toggleTags}>
                    Toggle Tags
                </button>
                <div id="showTags">
                    {this.state.showTags ?<ul>
                        <Tags tags={this.state.tags} onChange={this.handleChange} />
                    </ul> : null}
                </div>

            </div>
            <div >
                <h1>Search Results</h1>
                <ul>
                    <RecipeList recipes={recipes} />
                </ul>
            </div>
        </div>
        );
    }

}
