import React, { useState, useEffect } from 'react';
import '../RecipeComponent/Recipe.css';
import '../../App.css';
import IngredientsService from '../../services/IngredientsService';

const IngredientListRow = ({ingredients}) => {
    const [Ingredients, setIngredients] =useState([]);

    useEffect(() => {
    IngredientsService.getAll().then((data) => {
        setIngredients(data);
    }).catch((e) => {
        console.error(e);
    });
},[]);
    return (
        
        <div>
            <select className="brandDropdown">
                <option>--Select ingredient--</option>
                {Ingredients.map(dt =><option>{dt.title} </option>)}
            </select>
            <input type="number" name="points" step="1" value={ingredients.Amount} className="amountBox"/>
            <select className="brandDropdown">
                <option>--Units--</option>
                {Ingredients.map(dt =><option>{dt.parameter} </option>)}
            </select>
            <select className="brandDropdown">
                <option>--Select brand--</option>
                {Ingredients.map(dt =><option>{dt.brands.brandName} </option>)}
            </select>
        </div>
    )
}

export default IngredientListRow