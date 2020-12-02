import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Summary = ({ text1, value, text2 }) => (
    <p>{text1} {value} {text2}</p>
)

const Statistics = ({ good, neutral, bad }) => {
    const sum = (good, neutral, bad) => (
        good + neutral + bad
    )

    const average = (good, neutral, bad) => (
        (1 * good + 0 * neutral + (-1) * bad) / sum(good, neutral, bad)
    )

    const positive = (good, neutral, bad) => (
        good / sum(good, neutral, bad) * 100
    )
    
    if (sum(good, neutral, bad) == 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
    
    return (
        <div>
            <Summary text1="good" value={good} />
            <Summary text1="neutral" value={neutral} />
            <Summary text1="bad" value={bad} />
            <Summary text1="all" value={sum(good, neutral, bad)} />
            <Summary text1="average" value={average(good, neutral, bad)} />
            <Summary text1="positive" value={positive(good, neutral, bad)} text2="%" />
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => (
        setGood(good + 1)
    )

    const handleNeutralClick = () => (
        setNeutral(neutral + 1)
    )

    const handleBadClick = () => (
        setBad(bad + 1)
    )
    
    return (
        <>
        <h1>give feedback</h1>
        
        <div>
            <Button handleClick={handleGoodClick} text="good" />
            <Button handleClick={handleNeutralClick} text="neutral" />
            <Button handleClick={handleBadClick} text="bad" />
        </div>

        <h1>statistics</h1>

        <Statistics good={good} neutral={neutral} bad={bad} />

        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))