import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticLine = ({ text1, value, text2 }) => (
    <tr>
        <td>{text1}</td>
        <td>{value}</td>
        <td>{text2}</td>
    </tr>
)

const StatisticTable = ({ good, bad, neutral, sum, average, positive }) => (
    <table>
        <tbody>
            <StatisticLine text1="good" value={good} />
            <StatisticLine text1="neutral" value={neutral} />
            <StatisticLine text1="bad" value={bad} />
            <StatisticLine text1="all" value={sum} />
            <StatisticLine text1="average" value={average} />
            <StatisticLine text1="positive" value={positive} text2="%" />
        </tbody>
    </table>
)

const Statistics = ({ good, neutral, bad }) => {
    const calculateSum = (good, neutral, bad) => (
        good + neutral + bad
    )

    const calculateAverage = (good, neutral, bad) => (
        (1 * good + 0 * neutral + (-1) * bad) / calculateSum(good, neutral, bad)
    )

    const calculatePositive = (good, neutral, bad) => (
        good / calculateSum(good, neutral, bad) * 100
    )
    
    if (calculateSum(good, neutral, bad) === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    const sum = calculateSum(good, neutral, bad)
    const average = calculateAverage(good, neutral, bad)
    const positive = calculatePositive(good, neutral, bad)

    return (
        <StatisticTable 
            good={good} neutral={neutral} bad={bad}
            sum={sum} average={average} positive={positive} 
        />
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