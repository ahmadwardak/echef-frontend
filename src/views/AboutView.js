import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Banner from '../components/HeaderComponent/Banner';
import '../App.css';

export class AboutView extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <Banner pageTitle={this.props.title} />
                <div className="content">
                    <Container fluid>
                        <Row>
                            <Col>
                                About the eChef
                            </Col>
                        </Row>
                    </Container>


                </div>

            </div >
        );
    }

}


