import React, { useState, useEffect } from 'react';
import '../RecipeComponent/Recipe.css';
import '../../App.css';
import IngredientsService from '../../services/IngredientsService';

const IngredientListRow = ({ingredients, ingredientChangeHandler}) => {
    const [Ingredients, setIngredients] =useState([]);
    const [IngredientUnit, setIngredientUnit] = useState("");
    const [IngredientBrands, setIngredientBrands] = useState([]);

    useEffect(() => {
        IngredientsService.getAll().then((data) => {
            console.log(data);
            setIngredients(data);
        }).catch((e) => {
            console.error(e);
        });
    },[]);

    function selectedIngredient(event){
        console.log(event.target.value);
        var id = event.target.value;
        IngredientsService.getIngredient(id).then((data) => {
            setIngredientUnit(data.parameter);
            setIngredientBrands(data.ingredientBrands);
            ingredientChangeHandler(data.name);
        }).catch((e) => {
            console.error(e);
        });
    }

    return (
        
        <div>
            <select className="brandDropdown" onChange={selectedIngredient}>
                <option>--Select ingredient--</option>
                {Ingredients.map((dt,i) =><option key={i} value={dt._id}>{dt.name} </option>)}
            </select>
            <input type="number" name="points" step="1" value={ingredients.Amount} className="amountBox"/>
            <label>{IngredientUnit}</label>
            <select className="brandDropdown">
                <option>--Select brand--</option>
                {IngredientBrands.map((dt,i) =><option key={i}>{dt.brandName} </option>)}
            </select>
        </div>
    )
}

export default IngredientListRow