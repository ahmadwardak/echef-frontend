"use strict";

import React from 'react';
import Tag from "./Tag";



export const Tags = ({onChange, tags }) => {
    //  console.log("I got some taaags", tags)
    // return (
    //     tags.map(tag =>
    //         (<Tag  tag={tag}  />)
    //     ))
    return (
        tags.map((tag,id) =>
            (<Tag key={id} tagName={tag} id={id}  onChange={onChange} /> )
        )
    )

}


