import { useState } from 'react'


const Anecdote = ({text, vcount}) => <div><p>{text}</p><p>has {vcount} votes</p></div>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Header = ({text}) => <h2>{text}</h2>
const BestAnecdote = ({anecdotes, voteCounts}) => {
  const maxVotes = Math.max(...voteCounts)
  const maxIndex = voteCounts.indexOf(maxVotes)
  const bestAnecdote = anecdotes[maxIndex]
  if (maxVotes === 0) {
    return (
      <p>No votes available</p>
    )
  }
  return (
    <div>
      <p>{bestAnecdote}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voteCounts, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    const nextIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(nextIndex)  
  }

  const addVote = () => {
    const newVotes = [...voteCounts]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} vcount={voteCounts[selected]} />
      <Button handleClick={nextAnecdote}  text="next anecdote" />
      <Button handleClick={addVote} text="vote" />
      <Header text="Anecdote with most votes" />
      <BestAnecdote anecdotes={anecdotes} voteCounts={voteCounts} />
    </div>
  )
}

export default App