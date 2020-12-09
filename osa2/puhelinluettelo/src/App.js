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
    const [ notification, setNotification ] =useState(null)
    
    const Notification = ({ message }) => {
        const notificationStyle = {
            color: 'green',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        }

        if (message == null) {
            return null
        }

        return (
            <div style={notificationStyle}>
                {message}
            </div>
        )
    }

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])
    console.log('render', persons.length, 'persons')

    const changeNumber = () => {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}

        personService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(p => 
                    p.id !== person.id 
                    ? p
                    : returnedPerson    
                ))
            })
        
        setNotification(`Changed the number of ${newName} to ${newNumber}`)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }
    
    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                changeNumber()
            }
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
            
            setNotification(`Added ${newName}`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
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

    const handleButtonClick = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .deleteObject(person.id)
                .then(status => {
                    if (status === 200) {
                        setPersons(persons.filter(p => p.id !== person.id))
                    }
                })
            
            setNotification(`Deleted ${person.name}`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const personsToShow = newFilter.length === 0
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

        
    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={notification} />

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
            
            <Persons 
                persons={personsToShow}
                handleButtonClick={handleButtonClick}
            />
        </div>
    )
}

export default App