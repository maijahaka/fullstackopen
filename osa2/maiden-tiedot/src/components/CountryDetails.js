import React from 'react'

const CountryDetails = ({ country }) => (
    <div>
        <h1>{country.name}</h1>

        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

        <h2>languages</h2>

        <ul>
            {country.languages.map(language =>
                <li key={language.iso639_1}>{language.name}</li>    
            )}
        </ul>

        <img src={country.flag} alt="flag" height="200" />
    </div>
)

export default CountryDetails