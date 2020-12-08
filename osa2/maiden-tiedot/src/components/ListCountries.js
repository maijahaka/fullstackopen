import React from 'react'
import Countries from './Countries'
import CountryDetails from './CountryDetails'

const ListCountries = ({ countries }) => {
    const l = countries.length
    
    if (l > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    
    if (l > 1 && l < 11) {
        return (
            <Countries countries={countries} />
        )
    }

    if (l === 1) {
        return (
            <CountryDetails country={countries[0]} />
        )
    }

    return (
        <div>No matches, specify another filter</div>
    )
}

export default ListCountries