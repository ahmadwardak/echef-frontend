import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Nav, NavDropdown, Navbar, Form, FormControl, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

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
      cartItemsCount: 0,
      searchValue: "",
    }
    //console.log(this.state.user);
    // this.state.user ? console.log(1) : console.log(0);

    this.logout = this.logout.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  componentWillMount(props) {
    CategoryService.getCategories().then((data) => {
      this.setState({ categories: data })
    }).catch((e) => {
      console.error(e);
    });
    if (this.state.user != undefined) {
      shoppingCartService.getShoppingCartRecipeNumber(this.state.user._id).then((data) => {
        this.setState({ cartItemsCount: data })
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
    window.location.reload(false);
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    console.log("This category?", e.target.innerText)
    //innerText adds a whitepsace to category?
    const category = e.target.innerText.trim()
    const title = this.state.searchValue
    console.log("Searching these values:", category, title)
    this.props.history.push({
      pathname: "/search",
      title: title,
      category: category
    });
  }
  // inputField change for search
  handleChange(e) {
    console.log(e.target.value, "is Changing")
    this.setState({
      searchValue: e.target.value
    })
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
              <Nav.Link href="#our-team">Our Team</Nav.Link>
              {(UserService.isAuthenticated() && UserService.getCurrentUser().accounttype === 'chef') ?
                <Nav.Link href="#chef">My Recipes</Nav.Link>
                : ""}
            </Nav>
            <Form inline onSubmit={(e) => { this.handleSearchSubmit(e) }}>
              <InputGroup>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  name="title"
                  onChange={(e) => { this.handleChange(e) }}
                  onSubmit={(e) => { this.handleSearchSubmit(e) }}
                  aria-describedby="basic-addon2"
                />
                {/* On selecting this actually submits the form */}
                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  name="dropdownCategories"
                  title={this.state.dropDownValue}
                  id="input-group-dropdown-2"
                >
                  <Dropdown.Item onClick={(e) => { e.preventDefault() }} >All Categories</Dropdown.Item>
                  {this.state.categories.map((category, i) => <Dropdown.Item onClick={(e) => { this.changeValue(e.target.textContent); }} key={i}>{category} </Dropdown.Item>)}
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
                  <NavDropdown.Item href="#orders">My Orders</NavDropdown.Item>
                  <NavDropdown.Item href="#" onClick={() => this.logout()}>SignOut</NavDropdown.Item>

                </NavDropdown>
              </Nav>
              :
              <Nav>
                <Nav.Link onClick={() => this.goToLogin()}>Log In</Nav.Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }


};

export default withRouter(Header);