import React, { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
    const [ persons, setPersons ] = useState([
        {name: 'Arto Hellas' }
    ])
    const [ newName, setNewName ] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const personObject = {
                name: newName
            }

            setPersons(persons.concat(personObject))
        }

        setNewName('')
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <form onSubmit={addPerson}>
                <div>
                    name: <input 
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <h2>Numbers</h2>
            
            <Persons persons={persons} />
        </div>
    )
}

export default App