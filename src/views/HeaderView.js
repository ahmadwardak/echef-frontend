import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/HeaderComponent/Header";

class HeaderView extends Component {
  constructor(props) {
    super(props);
  };
  componentDidMount(props) {
    this.setState({
      loading: true
    });
  }
  render() {
    return (

      <div>
        <Header />
      </div>
    );
  }


}
export default withRouter(HeaderView);
