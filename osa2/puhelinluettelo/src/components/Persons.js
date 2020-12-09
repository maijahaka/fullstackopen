import React from 'react'
import Person from './Person'

const Persons = ({ persons , handleButtonClick}) => (
    <div>
        {persons.map(person =>
            <Person 
                key={person.name} 
                person={person}
                handleButtonClick={handleButtonClick} 
            />
        )}
    </div>
)

export default Persons