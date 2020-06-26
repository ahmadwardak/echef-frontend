import React, { useState, useEffect } from 'react';
import CategoryService from '../services/CategoryService'; 
 
 const Categories = (props) => {
        const [Data,setData] =useState([])
        
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
               <select  className="categoryDropdown" name="category" onChange={props.onChange} >
                   <option key={0}>All Categories</option>
                   { Data.map((dt,i) => <option key={i}>{dt} </option> )}
                </select>
            </div>
        )
    }

    
export default Categories;