import React from 'react'

const Button = (props) => (
    <button value={props.country.name} onClick={props.handleButtonClick}>show</button>
)

export default Button