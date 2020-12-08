import React from 'react'
import CountryName from './CountryName'

const Countries = ({ countries }) => (
    <div>
        {countries.map(country => 
            <CountryName key={country.numericCode} country={country} />
        )}
    </div>
)

export default Countries