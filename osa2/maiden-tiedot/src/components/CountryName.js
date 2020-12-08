import React from 'react'
import Button from './Button'

const CountryName = (props) => (
    <p>
        {props.country.name}
        <Button 
            country={props.country} 
            handleButtonClick={props.handleButtonClick} 
        />
    </p>
)

export default CountryName