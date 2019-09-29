import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVoted] = useState([0,0,0,0,0,0])
    const copy = [...votes]
    const giveVote = () => {
        copy[selected] += 1
        setVoted(copy)
    }

    const changeAnecdote = () => {
        console.log('button pressed')
        let rand = Math.floor(Math.random() * 6)
        setSelected(rand)
    }

    return (
        <div>
        <h1>Anecdote of the day</h1>
        <p>
        <Button handleClick = {changeAnecdote} text = 'Uusi anekdootti' />
        <Button handleClick = {giveVote} text = 'Äänestä' />
        </p>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <h1>Anecdote with most votes</h1>
        <MostVotes votes = {votes} anecdotes = {props.anecdotes} />
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const MostVotes = ({votes, anecdotes}) => {
    const copy = votes.map(x => x).sort()
    const mostPopularIndex = votes.findIndex(x => x === copy[5])
    return (  
        <div>
          {anecdotes[mostPopularIndex]}
          <p>has {copy[5]} votes</p>
        </div>
    )
  }

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
