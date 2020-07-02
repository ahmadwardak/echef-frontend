import React from 'react'

const Tag = ({onChange, tagName, id}) => {
  //console.log("I got a new tag:", tagName)
  return (
    <div>
    <input type="checkbox" key={id} className="Tag" name="tags" value={tagName}  onChange={onChange} defaultChecked />
    <label>{tagName}</label>
    </div>
    
  )
}

export default Tag