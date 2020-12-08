import React from 'react'
import CountryName from './CountryName'

const Countries = (props) => (
    <div>
        {props.countries.map(country => 
            <CountryName 
                key={country.numericCode} 
                country={country}
                handleButtonClick={props.handleButtonClick} 
            />
        )}
    </div>
)

export default Countries