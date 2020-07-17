import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Banner from '../components/HeaderComponent/Banner';
import '../App.css';
import headerSource from '../Assets/about-header.jpg';


export class NotFoundView extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <Banner pageTitle={this.props.title} recipeImageURL={headerSource} />
                <div className="content col-12 pt-4 px-4">
                    <Card
                        bg={'danger'}
                        text={'white'}
                        className="col-12 mb-2" >
                        <Card.Body>
                            <Card.Title>Not Found </Card.Title>
                            <Card.Text>
                                Page you are trying to access is not found.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </div >
            </div >
        );
    }

}


