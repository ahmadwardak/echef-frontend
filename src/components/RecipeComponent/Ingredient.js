import React, { useState, useEffect } from 'react';
import './Recipe.css';
import '../../App.css';
import IngredientsService from '../../services/IngredientsService';

const Ingredient = ({ingredient})=>{
    console.log(ingredient);
    
    return(
       <div className='ingredientSection row'>
           <BrandChoice ingredient={ingredient}/>
       </div> 
    )
}

const BrandChoice = ({ingredient}) => {
    const [Brands,setBrands] =useState([]);
    const [Title, setTitle] =useState("");
    const [Parameter, setParameter] = useState("");
    const [Price, setPrice] = useState(10);

    
    useEffect(() => {
    IngredientsService.getIngredient(ingredient.IngredientId).then((data) => {
        setBrands(data.brands);
        setTitle(data.title);
        setParameter(data.parameter);
    }).catch((e) => {
        console.error(e);
    });
},[]);
    return (
        
        <div>
            <input type="number" name="points" step="3" value={ingredient.Amount} className="amountBox"/>
            <label class="whiteFont amountParameter">{Parameter}</label>
            <select className="brandDropdown">
                <option>--{Title} from:--</option>
                { Brands.map(dt => <option>{dt.brandName} </option> )}
            </select>
            <div className='priceDiv'>
                <label class="whiteFont ">{Price} €</label>
            </div>
            
        </div>
    )
}

export default Ingredient