import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState(
    ''
  )
  const [ newNumber, setNewNumber ] = useState(
    ''
  )
  const [ newFilter, setNewFilter ] = useState(
    ''
  )

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
    for(var i = 0; i < persons.length; i++) {
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

  const rows = () => personsToBeShown.map(person =>
    <Person
      key={person.name}
      person={person}
    />
  )

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with
      <input
          value={newFilter}
          onChange={handleFilterChange}
        />
      <h2>Add a new</h2>
      <form onSubmit = {addPerson}>
        <div> name: <input value = {newName} onChange = {handleNameChange} /> </div>
        <div> number: <input value = {newNumber} onChange = {handleNumberChange} /> </div>
        <div> <button type = "submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <li key = {person.name}> {person.name} {person.number}</li>
  )
}
export default App