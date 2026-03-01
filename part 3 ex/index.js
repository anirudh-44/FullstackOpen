const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map( p =>  Number(p.id))) : 0
    return String(maxId + 1)
}

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const now = new Date()
    response.send(`
    <h2>Phonebook has info for ${persons.length} people.</h2>
    <p>${now}</p>
  `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.post('/api/persons/', (request, response) => {
    const name = request.body.name
    const number = request.body.number

    if(!name || !number){
        response.status(400).json({
            error: "Name or number is missing"
        })
    }

    if(persons.some(p => p.name === name)){
        return response.status(409).json({
            error : "Name already exists"
        })
    }
    
    const person = {
        "id" : generateId(),
        "name" : name,
        "number" : number,
    }

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter( p => p.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

