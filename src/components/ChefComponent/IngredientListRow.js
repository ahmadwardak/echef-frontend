import React, { useState, useEffect } from 'react';
import '../RecipeComponent/Recipe.css';
import '../../App.css';
import IngredientsService from '../../services/IngredientsService';
import { Divider } from '@material-ui/core';

const IngredientListRow = ({ onChange, ingredients }) => {
    const [Ingredients, setIngredients] = useState([]);
    const [IngredientUnit, setIngredientUnit] = useState(ingredients.ingredientUnit);
    const [IngredientBrands, setIngredientBrands] = useState([]);

    useEffect(() => {
        IngredientsService.getAll().then((data) => {
            setIngredients(data);
            //  console.log("I've set the following", data)
        }).catch((e) => {
            console.error(e);
        });
    }, []);

    function selectedIngredient(event) {
        console.log(event.target.value);
        var id = event.target.value;
        IngredientsService.getIngredient(id).then((data) => {
            console.log(data);
            setIngredientUnit(data.ingredientUnit);
            setIngredientBrands(data.ingredientBrands);
        }).catch((e) => {
            console.error(e);
        });
    }

    return (

        <div>
            <select className="brandDropdown" name="ingredientName" onChange={(e, i) => {
                onChange(e, i);
                selectedIngredient(e)
            }}
            >
                <option >--Select ingredient--</option>
                {Ingredients.map((dt, i) =>
                    <option key={dt._id} value={dt.value}  >{dt.name}
                    </option>)}
            </select>
            <input type="number" name="ingredientQuantity" step="1" value={ingredients.Amount} className="amountBox" onChange={onChange} />
            <label name="ingredientUnit"   >{IngredientUnit} </label>
            <select className="brandDropdown" name="ingredientBrand" onChange={onChange}>
                <option>--Select brand--</option>
                {IngredientBrands.map((dt, i) => <option key={i}>{dt.brandName} </option>)}
            </select>
        </div>
    )
}

export default IngredientListRow