import React from "react";
import UserService from '../services/UserService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PaymentInfo from '../components/PaymentComponent/PaymentInfoComponent.js';
import ShoppingCartService from '../services/ShoppingCartService';
import ShoppingBasket from "../components/PaymentComponent/ShoppingBasket";
import Banner from '../components/HeaderComponent/Banner';



export class CheckoutView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            user: UserService.getCurrentUser(),
            shoppingCart: {}
        };
        this.updateShoppingCart = this.updateShoppingCart.bind(this);
        this.removeShoppingCart = this.removeShoppingCart.bind(this);
    }
    componentWillMount(props) {
        this.setState({
            loading: true
        });



        ShoppingCartService.getShoppingCartByUserId(this.state.user._id).then((data) => {
            this.setState({
                shoppingCart: data[0],
                loading: false
            });
            // console.log("shopppp",this.state.shoppingCart);
        }).catch((e) => {
            console.error(e);
        });
    }
    updateShoppingCart(shoppingCart) {
        ShoppingCartService.updateShoppingCart(shoppingCart, this.state.user._id).then((data) => {
            window.location.reload();

        });
    }

    removeShoppingCart() {
        ShoppingCartService.deleteShoppingCartByUserID(this.state.user._id).then((data) => {
            window.location.reload();
        }).catch((e) => window.confirm(e));
    }



    //Home View
    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (
            <div>
                <Banner pageTitle={this.props.title} />
                <div className="content">
                    <Container fluid>
                        <Row xs={1} md={2}>
                            <Col>
                                <PaymentInfo user={this.state.user} shoppingCart={this.state.shoppingCart} orderCompleted={this.removeShoppingCart} />
                            </Col>
                            <Col>
                                <ShoppingBasket shoppingCart={this.state.shoppingCart} updateCart={this.updateShoppingCart} />
                            </Col>
                        </Row>
                    </Container>
                </div>


            </div>
        );
    }

}
