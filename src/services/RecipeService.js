import axios from 'axios'
const baseUrl = 'http://localhost:3001/recipes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {  
      return response.data  })}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const getRecipe = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const getRecipeName = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data.title)
}


export default { 
  getAll, 
  create, 
  update,
  getRecipe,
  getRecipeName
}