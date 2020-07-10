import React, { useState, useEffect } from 'react';
import CategoryService from '../services/CategoryService'; 
 
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
               <select className="difficultyDropdown" name="difficulty" onChange={props.onChange} >
                   <option key={0}>Select any level</option>
                   { Data.map((dt,i) => <option key={i}>{dt} </option> )}
                </select>
            </div>
        )
    }

    
export default CookingLevels;