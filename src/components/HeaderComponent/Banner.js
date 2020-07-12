import React, { Component } from 'react';

import HeaderImage from '../../Assets/echef-home-header-image.jpeg';
import Logo from '../../Assets/echef-logo.png';
import RecipeHeader from '../../Assets/recipe-1.jpg';


const homeHeaderStyle = {
    backgroundImage: 'url(' + HeaderImage + ')',
    height: '400px'
};

const recipeHeaderStyle = {
    backgroundImage: 'url(' + HeaderImage + ')',
    height: '250px',
};

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipeId: -1
        }
        console.log(this.props);
    }

    render() {
        return (

            <div>
                {this.props.pageTitle == 'eChef Home' ?

                    <div>
                        <div className='header' style={homeHeaderStyle}>
                            <div className='blackTransparency center'>
                                <img src={Logo} className="bigLogo" />
                            </div>
                        </div>
                    </div>
                    :
                    <div className='header' style={recipeHeaderStyle}>
                        <div className='blackTransparency'>
                            <h1 className='pageTitle'>{this.props.pageTitle}</h1>
                        </div>
                    </div>
                }</div>
        );
    }
}

export default Banner;