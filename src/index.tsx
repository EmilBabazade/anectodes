import React, {useState} from 'react'
import ReactDOM from 'react-dom'

interface HighestVotedAnectodeProps {
  anectode: string,
  votes: number
} 

const HighestVotedAnectode = ({anectode, votes}: HighestVotedAnectodeProps) => {
  if(votes == 0) return <p>No favorite Anectode</p>

  return (
    <div>
      <h1>Anectode With The Most Votes</h1>
      <p>{anectode}</p>
      <p>has {votes} votes</p>
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

interface AppProps {
  anectodes: string[]
}

const App = ({anectodes}: AppProps) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({
    points: anecdotes.map(a => 0),
    mostVotedPoint: 0
  })

  const onChangeAnectode = () => {
    const newIndex = Math.floor(Math.random() * Math.floor(anecdotes.length))
    setSelected(newIndex)
  }

  const onVote = () => {
    const newPoints = [...points.points]
    ++newPoints[selected]
    const max = Math.max(...newPoints)
    const mostVoted = newPoints.indexOf(max)
    setPoints({
      points: newPoints,
      mostVotedPoint: mostVoted
    })
  }

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <p>has {points.points[selected]} votes</p>
      <br />
      <button onClick={onVote}>vote</button>
      <button onClick={onChangeAnectode}>Next Anectode</button>
      <HighestVotedAnectode 
        anectode={anecdotes[points.mostVotedPoint]}
        votes={points.points[points.mostVotedPoint]}
      />
    </div>
  )
}

ReactDOM.render(
  <App anectodes={anecdotes} />,
  document.getElementById('root')
)