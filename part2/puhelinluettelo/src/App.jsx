import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Inputform from './components/Inputform'
import Phonebook from './components/Phonebook'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersonList] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialList => {
        setPersonList(initialList)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const oldPerson = persons.find(person => person.name === newName)
    if (oldPerson) {
      if (window.confirm(`${newName} is already added to phonebook,. Do you want to replace it with a new one?`)) {
        const personObject = { ...oldPerson, number: newNumber}
        personService
          .update(oldPerson.id, personObject)
            .then(updatedPerson=> {
              setPersonList(persons.map(person => person.id !== oldPerson.id ? person : updatedPerson))
              setMessage(`${updatedPerson.name}: New number added to phonebook.`)
              setTimeout(() => {setMessage(null)}, 5000)
            })  
      }
    } else {
      const personObject = {name: newName, number: newNumber}
      personService
        .create(personObject)
          .then(savedPerson=> {
            setPersonList(persons.concat(savedPerson))
            setMessage(`${savedPerson.name} added to phonebook.`)
            setTimeout(() => {setMessage(null)}, 5000)
          })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(deletedPerson => {
          setMessage(`${name} successfully deleted`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(error => {
          setErrorMessage(`${name} has already been removed from server`)
          setTimeout(() => {setErrorMessage(null)}, 5000)
        })
      setPersonList(persons.filter(person => person.id !== id))
   }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.includes(newFilter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} classname='message' />
      <Notification message={errorMessage} classname='error' />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h1>Add new</h1>
      <Inputform newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h1>Numbers</h1>
      <Phonebook persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
