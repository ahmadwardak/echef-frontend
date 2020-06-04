import React, { useState, useEffect } from 'react';
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
        const [Data,setData] =useState([])
        
        useEffect(() => {
        CategoryService.getAll().then((data) => {
            setData(data)
            //console.log("Current array:", Data);
        }).catch((e) => {
            console.error(e);
        });
    },[])
        console.log("Data now:", Data)
        return (
            
            <div>
               <select>{ Data.map(dt => <option>{dt} </option> )}</select>
            </div>
        )
    }



export default Header;
