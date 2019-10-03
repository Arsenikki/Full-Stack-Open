import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        let nameIsUnique = CheckForDuplicates(newName)
        if (nameIsUnique) {
            const nameObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1,
            }
            setPersons(persons.concat(nameObject))
        }
        setNewName('')
        setNewNumber('')
    }

    const CheckForDuplicates = (newName) => {
        for (var i = 0; i < persons.length; i++) {
            if (persons[i].name === newName) {
                window.alert(`${newName} is already added to phonebook`);
                return false;
            }
        }
        return true;
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

    const personsToBeShown = persons.filter(person => person.name.toLowerCase().includes(newFilter))

    return (
        <div>
            <h1>Phonebook</h1>
            filter shown with
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <PersonForm
                onSubmit={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Persons persons={personsToBeShown} />
        </div>
    )
}

export default App