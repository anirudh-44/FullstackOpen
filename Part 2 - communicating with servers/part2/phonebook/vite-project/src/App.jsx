import { useEffect, useState } from 'react'
import Name from './components/Name'
import axios from 'axios'
import comms from './services/comms'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const effect = () => {
    comms.getAll()
      .then( response => {
        setPersons(response.data)
      })
  }
  

  useEffect(effect,[])

  const addName = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    
    if(!existingPerson)
    {
      const person = {
      name : newName,
      number: newNumber
      }

      comms.create(person)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })      
    }
    else{
      const doUpdate = window.confirm(`${newName} is already added to phonebook,
         do you want to update the old number with new one?`)

      if(!doUpdate){
        return
      }
      console.log(existingPerson)

      const updatedPerson = {
        ...existingPerson,
        number : newNumber
      }

      console.log(updatedPerson)

      comms.update(existingPerson.id ,updatedPerson)
        .then(response => {
          setPersons(
            persons.map(p =>
              p.id !== existingPerson.id ? p : response.data
            ))
          setNewName('')
          setNewNumber('')
        })

    }
  }

  const deleteUser = (name,id) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name} ?`)

    if (!confirmed){
      return
    }
    comms.remove(id)
      .then(response => {
        setPersons( prevPersons => prevPersons.filter(person => person.id !== id))
      })
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleNameSearchChange = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }
  
  const searchResult = persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))
  //console.log(searchResult)

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <form>
        <div>
          name search: <input value={search} onChange={handleNameSearchChange} />
        </div>
      </form>

      <h2>Add New</h2>
      <form onSubmit={addName}> 
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          PhNo: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {searchResult.map(person => 
          <Name key = {person.id} personName = {person.name} personNumber={person.number} removeNumberHandler={() => deleteUser(person.name,person.id)}/>)
        }
      </ul>
    </div>
  )
}

export default App