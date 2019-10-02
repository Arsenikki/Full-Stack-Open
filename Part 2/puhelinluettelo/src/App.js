import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1234' , id: 1 }
  ])
  const [ newName, setNewName ] = useState(
    ''
  )
  const [ newNumber, setNewNumber ] = useState(
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
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const rows = () => persons.map(person =>
    // console.log("pepet:",persons) ||c
    <Person
      key={person.name}
      person={person}
    />
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div> name: <input value = {newName} onChange = {handleNameChange} /> </div>
        <div>number: <input value = {newNumber} onChange = {handleNumberChange} /> </div>
        <div>
          <button type = "submit">add</button>
        </div>
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