import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])
    console.log('render', persons.length, 'persons')
    
    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }

            personService
                .create(personObject)
                .then(returnedPerson => 
                    setPersons(persons.concat(returnedPerson))    
                )
        }

        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }

    const personsToShow = newFilter.length === 0
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter newFilter={newFilter} handleChange={handleFilterChange} />

            <h2>add a new</h2>

            <PersonForm 
                handleSubmit={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange} 
            />

            <h2>Numbers</h2>
            
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App