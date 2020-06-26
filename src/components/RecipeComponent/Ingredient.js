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
        console.log("serv", servingSize);
    }
    function amountChanged(event){
        
        
    }
    const [Brands,setBrands] =useState([]);
    const [Title, setTitle] =useState("");
    const [Parameter, setParameter] = useState("");
    const [Price, setPrice] = useState(0);
    const[Amount, setAmount] = useState(0);

    
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
            <input type="number" name="points" step="1" value={(ingredient.Amount)*servingSize} onChange={amountChanged} className="amountBox"/>
            <label class="whiteFont amountParameter">{Parameter}</label>
            <select className="brandDropdown" onChange={priceChanged}>
                <option>--{Title} from:--</option>
                { Brands.map(dt => <option value={dt.price}>{dt.brandName} </option> )}
            </select>
            <div className='priceDiv'>
                <label class="whiteFont ">{Price * servingSize} €</label>
            </div>
            
        </div>
    )
}

export default Ingredient