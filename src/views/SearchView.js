import { render } from "react-dom"
import React, { useState } from "react"
import RecipeService from "../services/RecipeService"
import { RecipeList } from '../components/SharedComponents/RecipeList';
import  Categories  from "../components/SharedComponents/Categories";
import  {Tags}  from "../components/SharedComponents/Tags";

export class SearchView extends React.Component {

    constructor(props) {
        super(props);
      
        
        this.state = {
            //data: [{ "title": "If you see this, the DB is not connected", "difficulty": "Easy", "_id": "FooBar", "category": "All Categories", "tags":"" }],
            data:[],
            loading: false,
            title: "",
            difficulty: "",
            category: "All Categories",
            tags:["uuh"],
            activeTags:[]
        }
        //Connects the onChange event to the function
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleChange = this.handleChange.bind(this);


    };
    // Normal React component Lifecycle
    componentWillMount() {
        this.setState({
            loading: true
        });
        RecipeService.getAll().then((data) => {
            // Get all viable tags 
            let tempTags= data.reduce((tmp,tag) => {
                // console.log("Tmp:", tmp, " Tag: ",tag.tags)
                return (tmp=[...tmp, ...tag.tags])
            }, [])
            tempTags = [...new Set(tempTags)]
            //console.log("tempTags",tempTags)
            this.setState({
                data: [...data],
                tags:tempTags,
                activeTags:tempTags,
                loading: false
            })
        }).catch((e) => {
            console.error(e);
        });
    }


    handleChange(event) {
       // console.log("", event.target.value, "checked", event.target.checked)
         let tmpTags = this.state.activeTags
        let value= event.target.value
        let checked = event.target.checked
        if(checked){//Selecting: add a value
            this.setState({
                activeTags:[...this.state.activeTags,value]
            })
        }// Remove a value
        else{
            tmpTags = tmpTags.filter(tag =>{
                //console.log("No want this:", value, "I am: ", tag)
                //console.log(tag === value)
                return ( tag !== value)
            })
            this.setState({
                activeTags:[... new Set(tmpTags)]
            })
        }
        
    }
    // Handles the filter search
    handleSearchChange(event) {
        event.preventDefault()
        let nameVal = event.target.name
        let val = event.target.value

        // console.log("nameVal", nameVal)
        // console.log("val", val)

        this.setState({
            [nameVal]: val

        })


    }


    //Home View
    render() {
        // console.log("Tags:", this.state.tags)
        const recipes = this.state.data.filter(recipe => {
            console.log("This is a recipe", recipe["tags"])
            console.log("Active tags", this.state.activeTags)
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
                <ul>
                <Tags  tags={this.state.tags} onChange={this.handleChange}/>
                </ul>
                

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
