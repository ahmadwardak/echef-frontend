import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/HeaderComponent/Header";
import RecipeService from '../services/RecipeService';

class HeaderView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      pageTitle: 'Home',
      recipeId: -1
    }
  };
  componentWillMount(props) {
    this.setState({
      loading: true
    });

    var id = ""//window.location.href.split('/').reverse()[0];
    if (id) {
      RecipeService.getRecipeName(id).then((data) => {
        this.setState({
          pageTitle: data,
          loading: false,
          recipeId: id
        });
      }).catch((e) => {
        console.error(e);
      });
    }
  }
  render() {
    var path = this.props.location.pathname.slice(1);
    if (this.state.recipeId != -1) {//if it is a recipe page
      path = this.state.pageTitle;
    }
    else {
      if (path == '') {//if not
        path = 'Home'
      }
    }

    return (

      <div>
        <Header title={path} recipeId={this.state.recipeId} />
      </div>
    );
  }


}
export default withRouter(HeaderView);
