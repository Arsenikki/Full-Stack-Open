import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { content: 'Arto Hellas', id: 1 }
  ])
  const [ newName, setNewName ] = useState(
    ''
  )

  const addName = (event) => {
    event.preventDefault()
    let nameIsUnique = CheckForDuplicates(newName)
    if (nameIsUnique) {
      const nameObject = {
        content: newName,
        id: persons.length + 1,
      }
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
  }

  const CheckForDuplicates = (newName) => {
    for(var i = 0; i < persons.length; i++) {
      if (persons[i].content === newName) {
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

  const rows = () => persons.map(person =>
    // console.log("pepet:",persons) ||c
    <Person
      key={person.content}
      person={person}
    />
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addName}>
        <input
          value = {newName}
          onChange = {handleNameChange}
        />
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
    <li key = {person.name}>{person.content}</li>
  )
}
export default App