import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ text, value }) => (
    <p>{text} {value}</p>
)

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

        <div>
            <Statistics text="good" value={good} />
            <Statistics text="neutral" value={neutral} />
            <Statistics text="bad" value={bad} />
        </div>

        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))