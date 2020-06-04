import React, { useState } from 'react';
import './Header.css';
import Logo from '../Assets/echef-logo.png';
import '../services/CategoryService'
import CategoryService from '../services/CategoryService';

const Header = () => {

    return (
        <div className="header">
            <img src={Logo} className="logo"/>
            <div className="header-back">
                <ul className="headerNav">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                <div className="header-right">
                    <input placeholder="Search"></input>
                    <Categories/>
                </div>
            </div>
            <h1>page title</h1>
        </div>
    )
  }

  const Categories = () => {
        var Data = [];
        CategoryService.getAll().then((data) => {
            Data = data;
            console.log(Data);
        }).catch((e) => {
            console.error(e);
        });
        return (
            
            <div>
               assal
            </div>
        )
    }



export default Header;
