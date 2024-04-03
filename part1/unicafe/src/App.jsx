import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>

const StatisticLine = ({ text, value, units }) => <tr><td>{text}</td><td>{value}</td><td>{units}</td></tr>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={good + neutral + bad} />
          <StatisticLine text='average' value={(good - bad)/(good + neutral + bad)} />
          <StatisticLine text='positive' value={100*good / (good + neutral + bad)} units='%' />
        </tbody>
      </table>
    )
  }
  return (
    <>No feedback given</>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header='give feedback' />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header header='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App