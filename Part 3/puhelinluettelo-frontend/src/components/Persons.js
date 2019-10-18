import React from 'react'
import Person from './Person'

const Persons = ({ persons, removePerson }) => {
    return (
        persons.map(person =>
            <Person
                key={person.name}
                person={person}
                removePerson = {() => removePerson(person.id)}
            />
        )
    )
}

export default Persons