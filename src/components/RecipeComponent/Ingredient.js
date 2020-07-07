import React, { useState, useEffect } from 'react';
import './Recipe.css';
import '../../App.css';
import IngredientsService from '../../services/IngredientsService';

const Ingredient = ({id, cartHandler,servingSize, ingredient})=>{   
    return(
       <div className='ingredientSection'>
           <BrandChoice id={id} cartHandler={cartHandler} ingredient={ingredient} servingSize={servingSize}/>
       </div> 
    )
}

const BrandChoice = ({id, cartHandler,servingSize,ingredient}) => {
    function amountChanged(event){
        cartHandler(event,id,"amount");
    }
    function priceChanged(event){
        var pr = Brands.find(br=> br.brandName == event.target.value);
        cartHandler(pr.price,id,"basePrice");
        cartHandler(pr.price*servingSize,id,"price");
        cartHandler(event, id, "brand");
        setPrice(pr.price);
    }
    function fixFloat(original){
        var result = Math.round(original*100)/100;
        return result;
    }
    const [Brands,setBrands] =useState([]);
    const [Title, setTitle] =useState("");
    const [Parameter, setParameter] = useState("");
    const [Price, setPrice] = useState(0);

    var tmp = (ingredient.ingredientQuantity)*servingSize;

    const[baseAmount,setBaseAmount]=useState(ingredient.ingredientQuantity);

    useEffect(() => {
    IngredientsService.getIngredient(ingredient.ingredientID).then((data) => {
        console.log("ingredient in brandChoice:", data);
        setBrands(data.ingredientBrands);
        setTitle(data.name);
        setParameter(data.ingredientUnit);
        cartHandler(data.name,id,"name");

    }).catch((e) => {
        console.error(e);
    });
},[]);
    return (
        
        <div>
            <input type="number" name="points" step="1" value={tmp} onChange={amountChanged} className="amountBox"/>
            <label className="whiteFont amountParameter">{Parameter}</label>
            <select className="brandDropdown" onChange={priceChanged}>
                <option>--{Title} from:--</option>
                { Brands.map(dt => <option value={dt.brandName}>{dt.brandName} </option> )}
            </select>
            <div className='priceDiv'>
                <label className="whiteFont"> {fixFloat((Price* tmp)/baseAmount)} €</label>
            </div>
            
        </div>
    )
}

export default Ingredient