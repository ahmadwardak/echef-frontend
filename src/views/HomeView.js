import React from "react";
import { Container, Row, Col, Card, CardDeck, CardGroup, Carousel } from "react-bootstrap";
import CategoryService from "../services/CategoryService";
import Link from "react-router-dom";
import Logo from "../Assets/echef-logo.png"
export class HomeView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            categories: []
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
                    <Card>
                        <Carousel
                            interval={50000}
                            slide
                            pause="hover"
                            controls={true}
                        //  style={carouselStyle}
                        >
                            {this.state.categories.map((cat, i) =>
                                <Carousel.Item role="listbox" style={{ width: "50%", height: "50%" }}>
                                    <img
                                        className="d-block w-50"
                                        src={Logo}
                                        style={{ width: "50px" }}
                                    >
                                    </img>
                                    <Carousel.Caption>
                                        <h3>{cat}</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </Card>
                </Row>
                <Row>
                    <Card>
                        Recent Recipes go here
                    </Card>
                </Row>

            </Container>

        </div>
        );
    }

}
