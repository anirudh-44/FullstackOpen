import { useState } from 'react'

const Display = (props) => {
    if(props.value == undefined){
      return(
        <>
          <p>{props.text}</p>
        </>
      )
    }
    return(
      <>
        <td>{props.text} : {props.value}</td>
      </>
    )
}

const Button = (props) => {
  return(
    <>
      <button onClick={props.eHandler}>{props.text}</button>
    </>
  )
}

const Statistics = (props) => {
  if (props.good == 0 && props.bad == 0 && props.neutral == 0 ){
    return(
      <>
        <Display text = {'No Feedback Given'} />
      </>
    )
  }
  return(
    <>
    <table>
      <tbody>
      <tr><Display text={'good'} value={props.good}/></tr>
      <tr><Display text={'bad'} value={props.bad}/></tr>
      <tr><Display text={'neutral'} value={props.neutral}/></tr>
      <tr><Display text={'all'} value={props.good + props.bad + props.neutral}/></tr>
      <tr><Display text={'average'} value={(props.good + props.bad * (-1) + (props.neutral * 0) )/(props.good + props.bad + props.neutral)}/></tr>
      <tr><Display text={'positive'} value={(props.good )/(props.good + props.bad + props.neutral)}/></tr>

      {/*<Display text={'neutral'} value={props.neutral}/>
      <Display text={'bad'} value={props.bad}/>
      <Display text={'all'} value={props.good + props.bad + props.neutral}/>
      <Display text={'average'} value={(props.good + props.bad * (-1) + (props.neutral * 0) )/(props.good + props.bad + props.neutral)}/>
      <Display text={'positive'} value= {(props.good )/(props.good + props.bad + props.neutral)}/>*/}
      </tbody>
    </table>
    </>
  )
}

const App = () => {

  // anecdotes
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment_eventhandler = (props) => {
    if (props.operation == 'good'){
      setGood(currentValue => currentValue + 1)
    }
    else if(props.operation == 'neutral'){
      setNeutral(currentValue => currentValue + 1)
    }
    else if(props.operation == 'bad'){
      setBad(currentValue => currentValue + 1)
    }
    
  }

  // anecdotes
  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  //voting

  const[votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const updateVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotes = Math.max(...votes)
  const indexOfMaxVote = votes.indexOf(maxVotes)

  return (
    <div>
      <h1>give feedback</h1>
      {/*}
      <button onClick = {() => increment_eventhandler({operation:'good'})}>good</button>
      <button onClick = {() => increment_eventhandler({operation: 'neutral'})}>neutral</button>
      <button onClick = {() => increment_eventhandler({operation: 'bad'})}>bad</button>
      */}
      <Button eHandler = {() => increment_eventhandler({operation:'good'})} text={'good'}/>
      <Button eHandler = {() => increment_eventhandler({operation:'bad'})} text={'bad'}/>
      <Button eHandler = {() => increment_eventhandler({operation:'neutral'})} text={'neutral'}/>
      <Button eHandler = {nextAnecdote} text = {'Random Anecdote'}/>
      <h1>statistics</h1>
      {/*
      <Display text={'good'} value={good}/>
      <Display text={'neutral'} value={neutral}/>
      <Display text={'bad'} value={bad}/>
      <Display text={'all'} value={good + bad + neutral}/>
      <Display text={'average'} value={(good + bad * (-1) + (neutral * 0) )/(good + bad + neutral)}/>
      <Display text={'positive'} value= {(good )/(good + bad + neutral)}/>
      */}
      <Statistics good={good} neutral={neutral} bad={bad} />
      <h1>Anecdote of the day</h1>
      <Display text = {anecdotes[selected] + " This has " +votes[selected]} />
      <Button eHandler = {updateVotes} text = {'vote'}/>
      <h1>Anecdote with most votes</h1>
      <Display text = {anecdotes[indexOfMaxVote]}/>
    </div>
  )
}

export default App
