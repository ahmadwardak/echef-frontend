import React, { useState, useEffect } from 'react';
import CategoryService from '../services/CategoryService'; 
import {Form, Col} from "react-bootstrap"
 
//Selecting a cooking difficulty level used in Recipe form
const CookingLevels = (props) => {
        const [Data,setData] =useState([])
        
        useEffect(() => {
        CategoryService.getCookingLevels().then((data) => {
            setData(data)
            //console.log("Current array:", data);
        }).catch((e) => {
            console.error(e);
        });
    },[])
    
    return (
            
        <div>
            <Form.Group>
            <Form.Control as="select" value={props.difficulty} name="level" onChange={props.onChange} >
            <option >Select a level</option>
                { Data.map((dt,i) => <option key={i}>{dt} </option> )}
            </Form.Control>
            </Form.Group>
        </div>
    )
}
export default CookingLevels;