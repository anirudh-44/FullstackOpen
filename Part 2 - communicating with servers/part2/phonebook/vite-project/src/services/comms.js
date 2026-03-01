import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (phoneEntry) => {
    return axios.post(baseUrl,phoneEntry)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedObject) => {
    return axios.put(`${baseUrl}/${id}`,updatedObject)
}

export default { getAll, create, remove, update}