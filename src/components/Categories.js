import React, { useState, useEffect } from 'react';
import CategoryService from '../services/CategoryService';
import { Form, Col } from "react-bootstrap"

//Category selection for search and recipe form
const Categories = (props) => {

    const val = props.value || props.category;
    const [Data, setData] = useState([])

    useEffect(() => {
        CategoryService.getCategories().then((data) => {
            setData(data)
        }).catch((e) => {
            console.error(e);
        });
    }, [])

    return (
        <div>
            <Form.Group >
                <Form.Control as="select" value={val} className="categoryDropdown" name="category" onChange={props.onChange} >
                    <option >All Categories</option>
                    {Data.map((dt, i) => <option key={i}>{dt} </option>)}
                </Form.Control>
            </Form.Group>
        </div>
    )
}

export default Categories;