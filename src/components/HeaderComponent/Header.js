import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Nav, NavDropdown, Navbar, Form, FormControl, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faShoppingCart, faCircle } from "@fortawesome/free-solid-svg-icons";

import Logo from '../../Assets/echef-logo.png';
import CategoryService from '../../services/CategoryService';

import './Header.css';


import UserService from '../../services/UserService';

import shoppingCartService from '../../services/ShoppingCartService';


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined,
      dropDownValue: "All Categories",
      categories: [],
      cartItemsCount:0
    }
    //console.log(this.state.user);
    // this.state.user ? console.log(1) : console.log(0);

    this.logout = this.logout.bind(this);
  }

  componentWillMount(props) {
    CategoryService.getCategories().then((data) => {
      this.setState({ categories: data })
    }).catch((e) => {
      console.error(e);
    });
    if(this.state.user != undefined){
      shoppingCartService.getShoppingCartRecipeNumber(this.state.user._id).then((data)=>{
        this.setState({cartItemsCount:data})
      }).catch((e) => {
        console.error(e);
      });
    }
  }
  changeValue(text) {
    this.setState({ dropDownValue: text });
  }

  logout() {
    UserService.logout();
    this.state = {
      user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
    };

    window.location = '/#login';
    window.location.reload(false);

  }
  goToLogin() {
    window.location = '/#login';
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="md" fixed="top" collapseOnSelect>
          <Navbar.Brand href="#">{<img src={Logo} height="42" width="42" />}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#/">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
            <Form inline>
              <InputGroup>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />

                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title={this.state.dropDownValue}
                  id="input-group-dropdown-2"
                >
                  <Dropdown.Item as="button" onClick={(e) => this.changeValue(e.target.textContent)}>All Categories</Dropdown.Item>
                  {this.state.categories.map((category, i) => <Dropdown.Item as="button" onClick={(e) => this.changeValue(e.target.textContent)} key={i}>{category} </Dropdown.Item>)}
                  {/* <Dropdown.Item as="button" onClick={(e) => this.changeValue(e.target.textContent)}>Italian</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={(e) => this.changeValue(e.target.textContent)}>Indian</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={(e) => this.changeValue(e.target.textContent)}>German</Dropdown.Item> */}
                </DropdownButton>
              </InputGroup>
            </Form>

            {this.state.user ?
              <Nav className="marginLeft">

                <Nav.Link href="#checkout">
                  <div className='shoppingCartGroup'>
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    <span className="numberBack">
                      <span className="cartCount">
                          {this.state.cartItemsCount}    
                      </span>
                    </span>
                  </div>
                  
                    
                </Nav.Link>
                <NavDropdown id="dropdown-menu-align-right" alignRight title={
                  <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faUserCircle} size="lg" />} >
                  <NavDropdown.Item href="#account">My Account</NavDropdown.Item>
                  <NavDropdown.Item href="#" onClick={() => this.logout()}>SignOut</NavDropdown.Item>

                </NavDropdown>
              </Nav>
              :
              <Nav>
                <Nav.Link onClick={() => this.goToLogin()}>Sign In</Nav.Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }


};

export default withRouter(Header);