import React, { Component } from 'react';

import HeaderImage from '../../Assets/echef-home-header-image.jpeg';
import Logo from '../../Assets/echef-logo.png';
import RecipeHeader from '../../Assets/recipe-1.jpg';

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundImage: 'url(' + RecipeHeader + ')'
        }
        console.log(this.props.recipeImageURL);
    }

    componentWillMount(props) {

        if (this.props.recipeImageURL !== undefined) {
            this.setState({ backgroundImage: 'url(' + this.props.recipeImageURL + ')' });
        }
    }

    render() {
        return (

            <div>
                {this.props.pageTitle == 'eChef Home' ?

                    <div>
                        <div className='header' style={{ backgroundImage: 'url(' + HeaderImage + ')', backgroundSize: 'cover', height: '400px' }}>
                            <div className='blackTransparency center'>
                                <img src={Logo} className="bigLogo" />
                            </div>
                        </div>
                    </div>
                    :
                    <div className='header' style={{ backgroundImage: this.state.backgroundImage, backgroundSize: 'cover', height: '300px' }}>
                        <div className='blackTransparency'>
                            <h1 className='pageTitle'>{this.props.pageTitle}</h1>
                        </div>
                    </div>
                }</div>
        );
    }
}

export default Banner;