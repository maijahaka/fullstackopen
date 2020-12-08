import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import ListCountries from './components/ListCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState([])

  const handleFilterChange = (event) => {
    console.log('filter', event.target.value)
    setNewFilter(event.target.value)
  }

  const handleButtonClick = (event) => {
    console.log('clicked', event.target.value)
    setNewFilter(event.target.value)
  }

  const countriesToShow = newFilter.length === 0
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
  console.log('found', countriesToShow.length, 'matches')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <ListCountries 
        countries={countriesToShow} 
        handleButtonClick={handleButtonClick} 
      />
    </>
  )
}

export default App;
