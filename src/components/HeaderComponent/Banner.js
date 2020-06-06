import React, {useState} from 'react'
import './Header.css'
import HeaderNavBar from './HeaderNavBar.js';
import HomeHeader from '../../Assets/echef-home-header-image.jpeg';
import Logo from '../../Assets/echef-logo.png';


const Banner = ({ title, recipeId }) => {

var homeHeaderStyle = {
    backgroundImage: 'url(' + HomeHeader + ')',
    height: '400px'
};


if(recipeId=-1){
    //it is not a recipe page
    if(title =='Home'){
        return(
            <div>
                <div className='header' style={homeHeaderStyle}>
                <div className='blackTransparency'>
                  <HeaderNavBar  shouldDisplayLogo={false}/>
                  <img src={Logo} className="bigLogo"/>
                </div>
                </div>
            </div>
        )
    }
    else{
      return(
            <div className='header noImageStyle'>
              <HeaderNavBar  shouldDisplayLogo={true}/>
              <h1 className='pageTitle'>{title}</h1>
            </div>
    )
    }
    

}
  console.log(src)



  return (
    <div className='header' style={homeHeaderStyle}>
        <HeaderNavBar ShowLogo='false'/>
        <h1 className='pageTitle'>{title}</h1>
    </div>
  )
}

export default Banner