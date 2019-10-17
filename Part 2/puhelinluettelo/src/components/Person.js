import React from 'react'

const Person = ({ person, removePerson }) => {
    return (
        <li key={person.name}>
            {person.name} {person.number}
            <button onClick={removePerson}>{"delete"}</button>
        </li>
    )
}

export default Person