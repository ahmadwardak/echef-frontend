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
        cartHandler(event.target.value,id,"amount");
    }
    function priceChanged(event){
        console.log("eventttt",event.target.value);
        var price=0;
        if(event.target.value!=0){
            price=Brands.find(br=> br.brandName == event.target.value).price;
            cartHandler(event.target.value, id, "brand");
            cartHandler(true, id, "isActive");
        }
        else{
            cartHandler(ingredient.ingredientBrand, id, "brand");
            cartHandler(false, id, "isActive");

        }
        cartHandler(price,id,"basePrice");
        cartHandler(price*servingSize,id,"price");
        
        
        setSelectedBrand(event.target.value);
        console.log("SELECTED:",selectedBrand);
        setPrice(price);
    }
    function fixFloat(original){
        var result = Math.round(original*100)/100;
        return result;
    }
    const [Brands,setBrands] =useState([]);
    const [Title, setTitle] =useState("");
    const [Parameter, setParameter] = useState("");
    const [Price, setPrice] = useState(0);
    const [selectedBrand,setSelectedBrand]=useState('');

    var tmp = (ingredient.ingredientQuantity)*servingSize;

    const[baseAmount,setBaseAmount]=useState(ingredient.ingredientQuantity);

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
            <input type="number" name="points" step="1" value={tmp} onChange={amountChanged} className="amountBox"/>
            <label className="whiteFont amountParameter">{Parameter}</label>
            <select className="brandDropdown" onChange={priceChanged} value={selectedBrand}>
                <option key={0} value={0}>--{Title} from:--</option>
                { Brands.map(dt => <option key={dt.brandName} value={dt.brandName}>{dt.brandName} </option> )}
            </select>
            <div className='priceDiv'>
                <label className="whiteFont"> {fixFloat((Price* tmp)/baseAmount)} €</label>
            </div>
            
        </div>
    )
}

export default Ingredient