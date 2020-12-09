import React from 'react'
import Button from './Button'

const Person = ({ person, handleButtonClick }) => (
    <p>
        { person.name } { person.number } <Button handleButtonClick={handleButtonClick} person={person} />
    </p>
)

export default Person