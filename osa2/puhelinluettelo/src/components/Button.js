import React from 'react'

const Button = ({ handleButtonClick, person }) => (
    <button onClick={() => handleButtonClick(person)}>delete</button>
)

export default Button