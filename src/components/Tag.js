import React from 'react'
import { Form } from "react-bootstrap";

const Tag = ({ onChange, tagName, id }) => {
  //console.log("I got a new tag:", tagName)
  return (
    <div>
      <Form.Group className="ml-2 mb-2 mt-0">
        <Form.Check type="checkbox"
          label={tagName}
          key={id} name="tags" value={tagName} onChange={onChange} defaultChecked />
      </Form.Group>
    </div>

  )
}

export default Tag;