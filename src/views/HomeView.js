import React from "react";
import { Container, Row, Col, Card, CardDeck, CardGroup } from "react-bootstrap";

import InfiniteCarousel from 'react-leaf-carousel';

import CategoryService from "../services/CategoryService";
import Link from "react-router-dom";
import Logo from "../Assets/echef-logo.png";

import '../App.css';



export class HomeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            categories: [],
        }

    }





    componentDidMount() {

        CategoryService.getCategories().then((data) => {
            this.setState({
                categories: data,
                loading: false
            }
            )
            console.log("Got this", data)
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

        return (<div>
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
                                {this.state.categories.map((cat, i) =>
                                    <div key={i}>
                                        <img
                                            alt=""
                                            src={Logo}
                                        />
                                        <h3>{cat}</h3>
                                    </div>

                                )}

                            </InfiniteCarousel>

                        </Card>

                    </Col>
                </Row>
            </Container>



        </div >
        );
    }

}


