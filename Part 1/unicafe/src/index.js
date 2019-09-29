import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        console.log('good pressed')
        setGood(good + 1)
    }
    
    const handleNeutralClick = () => {
        console.log('neutral pressed')
        setNeutral(neutral + 1)
    }
    
    const handleBadClick = () => {
        console.log('bad pressed')
        setBad(bad + 1)
    }

    const sum = () => good + neutral + bad
    
    const percentageOfPositive = () => 100 * good / sum()

    const average = () => (1 * good - 1 * bad) / sum()

    if (sum() === 0) {
        return (
            <div>
            <h1>anna palautetta</h1>
            <Button handleClick={handleGoodClick} text='good'/>
            <Button handleClick={handleNeutralClick} text='neutral'/>
            <Button handleClick={handleBadClick} text = 'bad'/>
            <h1>statistiikka</h1>
            <p>Ei yhtään palautetta annettu</p>
            </div> 
        )
    }
    return (
        <div>
        <h1>anna palautetta</h1>
        <Button handleClick={handleGoodClick} text='good'/>
        <Button handleClick={handleNeutralClick} text='neutral'/>
        <Button handleClick={handleBadClick} text = 'bad'/>
        <h1>statistiikka</h1>
        <Statistic value = {good} text = 'hyvä'/>
        <Statistic value = {neutral} text = 'neutraali'/>
        <Statistic value = {bad} text = 'huono'/>
        <Statistic value = {sum()} text = 'yhteensä' />
        <Statistic value = {average()} text = 'keskiarvo'/>
        <Statistic value = {percentageOfPositive()} text = 'positiivisia' extra = '%' />
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistic = ({value, text, extra}) => {
    return (
        <div>
        <table>
            <tbody>
                <tr>
                    <td width="80"> {text} </td>
                    <td> {value} </td>
                    <td> {extra} </td>             
                </tr>
            </tbody>
        </table>
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)