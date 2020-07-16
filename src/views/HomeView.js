import React from "react";
import { Container, Row, Col, Card, CardDeck, CardGroup } from "react-bootstrap";

import InfiniteCarousel from 'react-leaf-carousel';
import CategoryService from "../services/CategoryService";
import RecipeService from "../services/RecipeService"
import { RecipeList } from '../components/RecipeList';
import { Link } from "react-router-dom";
import Banner from '../components/HeaderComponent/Banner';
import ReactCountryFlag from "react-country-flag";
import '../App.css';

let countryCodes = { Italian: "IT", Indian: "IN", Spanish: "ES", Mexican: "MX", American: "US", German: "DE", Iranian: "IR", Brazilian: "BR", Japanese: "JP", Chinese: "CN" };

export class HomeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            categories: [],
            newRecipes: []
        }
        CategoryService.getCategories().then((data) => {
            this.setState({
                categories: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
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
                    <Container fluid>
                        <Row>
                            <Col>
                                <Card>
                                    <InfiniteCarousel
                                        breakpoints={[
                                            {
                                                breakpoint: 550,
                                                settings: {
                                                    slidesToShow: 2,
                                                    slidesToScroll: 2,
                                                },
                                            },
                                            {
                                                breakpoint: 580,
                                                settings: {
                                                    slidesToShow: 3,
                                                    slidesToScroll: 3,
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
                                        slideSpacing={0}
                                        sideSize={0.1}
                                        slidesToScroll={4}
                                        slidesToShow={6}
                                        scrollOnDevice={false}
                                    >
                                        {cats.map((cat, i) =>
                                            <div key={i} className="px-0" >
                                                <Link style={{ fontSize: '90%' }} to={{ pathname: '/search', category: cat }}>
                                                    <ReactCountryFlag
                                                        svg
                                                        countryCode={countryCodes[cat]}
                                                        style={{
                                                            fontSize: '5em',
                                                            lineHeight: '2em',
                                                            borderRadius: '0.3em',
                                                            height: '70%',
                                                            width: '70%',
                                                            objectFit: 'contain',
                                                            border: '1px solid #ccc',

                                                        }}
                                                        title="US"

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


