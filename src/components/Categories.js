import React, { useState, useEffect } from 'react';
import CategoryService from '../services/CategoryService'; 
import {Form, Col} from "react-bootstrap"
 
 const Categories = (props) => {
        const [Data,setData] =useState([])
        console.log("props.category",props)
        useEffect(() => {
        CategoryService.getCategories().then((data) => {
            setData(data)
            //console.log("Current array:", Data);
        }).catch((e) => {
            console.error(e);
        });
    },[])
        return ( 
            <div>
                <Form.Group>
                <Form.Control as="select" value={props.value} className="categoryDropdown" name="category" onChange={props.onChange} >
                <option >All Categories</option>
                    { Data.map((dt,i) => <option key={i}>{dt} </option> )}
                </Form.Control>
                </Form.Group>
            </div>
        )
    }

    
export default Categories;