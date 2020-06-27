import React, { useState, useEffect } from 'react';
import './Header.css';
import Logo from '../../Assets/echef-logo.png';
import cartButton from '../../Assets/cart.png';
import Categories from '../SharedComponents/Categories'

const HeaderNavBar = ({shouldDisplayLogo}) => {
    const logoStyle ={
        display: shouldDisplayLogo ? 'block' : 'none'
    };
    return (
        <div>
            <div className="header-back">
                <ul className="headerNav">
                    <li><a href="#">Home</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                <img src={Logo} className="logo" style={logoStyle}/>
                <div className="header-right">
                    <input placeholder="Search"></input>
                    <Categories/>
                    <img className="cartButton" src={cartButton} href="#"/>
                </div>
            </div>
        </div>
    )
  }

 



export default HeaderNavBar;
