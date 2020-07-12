import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/HeaderComponent/Header";
import RecipeService from '../services/RecipeService';
import { matchPath } from 'react-router';


class HeaderView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: 'Home',
      recipeId: -1
    }
  };
  componentDidMount(props) {
    this.setState({
      loading: true
    });
    const isRecipePathActive = !!matchPath(
      this.props.location.pathname,
      '/recipe/:id'
    );
    const isHome = !!matchPath(
      this.props.location.pathname,
      '/'
    );
    let recipeId = "";
    if (isRecipePathActive) {
      recipeId = window.location.href.split('/').reverse()[0];
      this.setState({
        //pageTitle: data.title,
        recipeId: recipeId,
      });

    }
    document.title = this.props.title;
    console.log(this.props.location.pathname);
    // if (recipeId) {

    //   RecipeService.getRecipeName(recipeId).then((data) => {
    //     console.log("test", data);
    //     this.setState({
    //       pageTitle: data.title,
    //       recipeId: data._id,
    //     });
    //   }).catch((e) => {
    //     console.error(e);
    //   });

    // } else {
    //   if (isHome) {
    //     this.setState({
    //       pageTitle: 'Home',
    //       recipeId: -1,
    //     });

    //   } else {
    //     this.setState({
    //       pageTitle: '',
    //       recipeId: -1,
    //     });

    //   }

    // }

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
