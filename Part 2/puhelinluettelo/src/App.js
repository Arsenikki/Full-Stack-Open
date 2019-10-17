import React, { useState, useEffect } from 'react'

import personService from './services/personService'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: newNumber
        }
        let nameIsDuplicate = CheckForDuplicates(newName)
        if (nameIsDuplicate) {
            let replaceNumberBool = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
            if (replaceNumberBool) {
                personService
                .getAll()
                .then(allPersons => {
                    let duplicatePerson = allPersons.filter(person => person.name === newName)
                    personService
                    .replace(nameObject, duplicatePerson[0].id)
                    .then(returnedPerson => {
                        const UpdatedList = persons.map(person => person.name !== returnedPerson.name ? person : returnedPerson )
                        setPersons(UpdatedList)
                    })
                })
            }
        }
        else {
            personService
            .create(nameObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
            })
        }
        setNewName('')
        setNewNumber('')
    }

    const removePerson = id => {
        personService
        .remove(id)
        .then(() => {
            const newList = persons.filter(person => person.id !== id)
            setPersons(newList)
        })
    }

    const CheckForDuplicates = (newName) => {
        for (var i = 0; i < persons.length; i++) {
            if (persons[i].name === newName) {
                return true;
            }
        }
        return false;
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
            <Persons persons={personsToBeShown} removePerson={removePerson} />
        </div>
    )
}

export default App