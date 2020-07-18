import { render } from "react-dom"
import React from "react"
import OrderDetail from '../components/OrdersComponent/OrdersDetail';
import OrderService from '../services/OrderService';
import Banner from '../components/HeaderComponent/Banner';
import UserService from '../services/UserService';
import { Accordion, Alert } from 'react-bootstrap';


export class OrderView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            orders: [],
            user: UserService.getCurrentUser()
        };
    }
    componentWillMount(props) {
        this.setState({
            loading: true
        });


        OrderService.getOrderByUserId(this.state.user._id).then((data) => {
            // console.log("orders", data);
            this.setState({
                orders: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
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
                    {
                        this.state.orders.length == 0 ?
                            <Alert variant='success'>
                                You don't have any orders. {' '}
                                <Alert.Link href="#/search">Check our recipes</Alert.Link> to make your first order.
                            </Alert>
                            :
                            <Accordion>
                                {this.state.orders.map((ord, index) => <OrderDetail order={ord} key={ord._id} index={index} />)}
                            </Accordion>
                    }

                </div>
            </div>
        );
    }

}
