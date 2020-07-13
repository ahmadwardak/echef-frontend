import React from "react";
import { Container, Row, Col, Card, CardDeck, CardGroup } from "react-bootstrap";

import InfiniteCarousel from 'react-leaf-carousel';
import CategoryService from "../services/CategoryService";
import RecipeService from "../services/RecipeService"
import { RecipeList } from '../components/RecipeList';
import {Link} from "react-router-dom";
import Logo from "../Assets/echef-logo.png";
import Banner from '../components/HeaderComponent/Banner';

import '../App.css';



export class HomeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            categories: [],
            newRecipes: []
        }

        console.log(this.props);
    }


    componentWillMount() {
        this.setState({
            loading: true
        });
        RecipeService.getNew().then((data) => {
            this.setState({
                newRecipes: [...data],
                loading: false,

            })
        }).catch((e) => {
            console.error(e)
        })
    }
    componentDidMount() {

        CategoryService.getCategories().then((data) => {
            this.setState({
                categories: data,
                loading: false
            }
            )
            // console.log("Got this", data)
            //console.log("Current array:", Data);
        }).catch((e) => {
            console.error(e);
        });


    };

    //Home View
    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        const recs = this.state.newRecipes
        const cats = this.state.categories

        return (
            <div>
                <Banner pageTitle={this.props.title} />
                <div className="content">
                    <h1>Home Page</h1>
                    <Container fluid>
                        <Row>
                            <Col>
                                <Card>
                                    <InfiniteCarousel
                                        breakpoints={[
                                            {
                                                breakpoint: 500,
                                                settings: {
                                                    slidesToShow: 2,
                                                    slidesToScroll: 2,
                                                },
                                            },
                                            {
                                                breakpoint: 768,
                                                settings: {
                                                    slidesToShow: 3,
                                                    slidesToScroll: 3,
                                                },
                                            },
                                            {
                                                breakpoint: 1000,
                                                settings: {
                                                    slidesToShow: 4,
                                                    slidesToScroll: 3,
                                                },
                                            },
                                        ]}
                                        dots={false}
                                        showSides={true}
                                        sidesOpacity={0.5}
                                        sideSize={0.1}
                                        slidesToScroll={4}
                                        slidesToShow={6}
                                        scrollOnDevice={false}
                                    >
                                        {cats.map((cat, i) =>
                                            <div key={i}>
                                                <Link to={{ pathname: '/search', aboutProps: { category: cat } }}>
                                                <img
                                                    alt=""
                                                    src={Logo}
                                                />
                                                <h3>{cat}</h3>
                                                </Link>
                                            </div>

                                        )}
                                    </InfiniteCarousel>
                                </Card>
                            </Col>
                        </Row>
                        <Row xs={12}>
                            <Col >
                                <Card>
                                    <Card.Header><span>Want to try something new?</span></Card.Header>
                                    {<RecipeList recipes={recs} />}
                                </Card>
                            </Col>
                        </Row>
                        <Row xs={12}>
                            <Col >
                                <Card>
                                    <Card.Header><span>Want to try something new?</span></Card.Header>
                                    {<RecipeList recipes={recs} />}
                                </Card>
                            </Col>
                        </Row>
                    </Container>


                </div>

            </div >
        );
    }

}


