import React, { useState, useEffect } from 'react';
import './Recipe.css';
import '../../App.css';
import IngredientsService from '../../services/IngredientsService';

const Ingredient = ({servingSize, ingredient, priceHandler})=>{    
    return(
       <div className='ingredientSection row'>
           <BrandChoice ingredient={ingredient} priceHandler={priceHandler} servingSize={servingSize}/>
       </div> 
    )
}

const BrandChoice = ({servingSize,ingredient, priceHandler}) => {
    function priceChanged(event){
        setPrice(event.target.value*servingSize);
        priceHandler(Price*servingSize,event.target.value*servingSize);
    }
    function amountChanged(event){
        console.log("value change", event.target.value);
        setAmount(event.target.value);
    }
    function fixFloat(original){
        var result = Math.round(original*100)/100;
        return result;
    }
    const [Brands,setBrands] =useState([]);
    const [Title, setTitle] =useState("");
    const [Parameter, setParameter] = useState("");
    const [Price, setPrice] = useState(0);
    const [Amount, setAmount] = useState((ingredient.ingredientQuantity)*servingSize);

    
    useEffect(() => {
    IngredientsService.getIngredient(ingredient.ingredientID).then((data) => {
        setBrands(data.ingredientBrands);
        setTitle(data.name);
        setParameter(data.ingredientUnit);
    }).catch((e) => {
        console.error(e);
    });
},[]);
    return (
        
        <div>
            <input type="number" name="points" step="1" value={(ingredient.ingredientQuantity)*servingSize} onChange={amountChanged} className="amountBox"/>
            <label class="whiteFont amountParameter">{Parameter}</label>
            <select className="brandDropdown" onChange={priceChanged}>
                <option>--{Title} from:--</option>
                { Brands.map(dt => <option value={dt.price}>--{Title} from: {dt.brandName} </option> )}
            </select>
            <div className='priceDiv'>
                <label class="whiteFont ">{fixFloat((Price* Amount)/ingredient.ingredientQuantity)} €</label>
            </div>
            
        </div>
    )
}

export default Ingredient