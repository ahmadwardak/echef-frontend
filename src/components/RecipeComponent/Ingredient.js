import React, { useState, useEffect } from 'react';
import './Recipe.css';
import '../../App.css';
import IngredientsService from '../../services/IngredientsService';

const Ingredient = ({ servingSize, ingredient, priceHandler }) => {
    return (
        <div className='ingredientSection row'>
            <BrandChoice ingredient={ingredient} priceHandler={priceHandler} servingSize={servingSize} />
        </div>
    )
}

<<<<<<< HEAD
const BrandChoice = ({ servingSize, ingredient, priceHandler }) => {
    function priceChanged(event) {
        setPrice(event.target.value * servingSize);
        priceHandler(Price * servingSize, event.target.value * servingSize);
    }
    function amountChanged(event) {
        console.log("value change", event.target.value);
        setAmount(event.target.value);
    }
    function fixFloat(original) {
        var result = Math.round(original * 100) / 100;
        return result;
=======
const BrandChoice = ({servingSize,ingredient, priceHandler}) => {
    function priceChanged(event){
        setPrice(event.target.value*servingSize);
        priceHandler(Price*servingSize,event.target.value*servingSize);
        console.log("serv", servingSize);
    }
    function amountChanged(event){
        
        
>>>>>>> parent of cc04d1c... Merge branch 'Assal's'
    }
    const [Brands, setBrands] = useState([]);
    const [Title, setTitle] = useState("");
    const [Parameter, setParameter] = useState("");
    const [Price, setPrice] = useState(0);
<<<<<<< HEAD
    const [Amount, setAmount] = useState((ingredient.ingredientQuantity) * servingSize);

=======
    const[Amount, setAmount] = useState(0);
>>>>>>> parent of cc04d1c... Merge branch 'Assal's'

    useEffect(() => {
<<<<<<< HEAD
        IngredientsService.getIngredient(ingredient.ingredientID).then((data) => {
            setBrands(data.ingredientBrands);
            setTitle(data.name);
            setParameter(data.ingredientUnit);
        }).catch((e) => {
            console.error(e);
        });
    }, []);
=======
    IngredientsService.getIngredient(ingredient.IngredientId).then((data) => {
        setBrands(data.brands);
        setTitle(data.title);
        setParameter(data.parameter);
    }).catch((e) => {
        console.error(e);
    });
},[]);
>>>>>>> parent of cc04d1c... Merge branch 'Assal's'
    return (

        <div>
<<<<<<< HEAD
            <input type="number" name="points" step="1" value={(ingredient.ingredientQuantity) * servingSize} onChange={amountChanged} className="amountBox" />
            <label class="whiteFont amountParameter">{Parameter}</label>
            <select className="brandDropdown" onChange={priceChanged}>
                <option>--{Title} from:--</option>
                {Brands.map(dt => <option value={dt.price}>--{Title} from: {dt.brandName} </option>)}
            </select>
            <div className='priceDiv'>
                <label class="whiteFont ">{fixFloat((Price * Amount) / ingredient.ingredientQuantity)} €</label>
=======
            <input type="number" name="points" step="1" value={(ingredient.Amount)*servingSize} onChange={amountChanged} className="amountBox"/>
            <label class="whiteFont amountParameter">{Parameter}</label>
            <select className="brandDropdown" onChange={priceChanged}>
                <option>--{Title} from:--</option>
                { Brands.map(dt => <option value={dt.price}>{dt.brandName} </option> )}
            </select>
            <div className='priceDiv'>
                <label class="whiteFont ">{Price* servingSize} €</label>
>>>>>>> parent of cc04d1c... Merge branch 'Assal's'
            </div>

        </div>
    )
}

export default Ingredient