import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Banner from "../components/HeaderComponent/Banner";
class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var path = this.props.location.pathname.slice(1);
    if(path=='')
    {
        path='Home';
    }
    return (
      <div>
        <Banner title={path} recipeId={-1}/>
      </div>
    );
  }
}

export default withRouter(Header);
