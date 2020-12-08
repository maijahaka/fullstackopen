import React from 'react'
import Countries from './Countries'
import CountryDetails from './CountryDetails'

const ListCountries = (props) => {
    const l = props.countries.length
    
    if (l > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    
    if (l > 1 && l < 11) {
        return (
            <Countries 
                countries={props.countries}
                handleButtonClick={props.handleButtonClick} 
            />
        )
    }

    if (l === 1) {
        return (
            <CountryDetails country={props.countries[0]} />
        )
    }

    return (
        <div>No matches, specify another filter</div>
    )
}

export default ListCountries