import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {

    const [weather, setWeather] = useState({
        "current": {
            "temperature": "temperature not retrieved",
            "wind_speed": "wind speed not retrieved",
            "weather_icons": [],
            "wind_dir": "wind direction not retrieved"
        }
    })
    
    useEffect(() => {
        console.log('effect')
        const api_key = process.env.REACT_APP_API_KEY
        console.log('API key found')
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                console.log('promise fulfilled')
                setWeather(response.data)
            })
    }, [country.capital])

    return (
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

            <h2>Weather in {country.capital}</h2>

            <p><b>temperature:</b> {weather.current.temperature} Celsius</p>

            {weather.current.weather_icons.map(icon =>
                <img key={icon} src={icon} alt="weather icon" />    
            )}

            <p><b>wind:</b> {weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default CountryDetails