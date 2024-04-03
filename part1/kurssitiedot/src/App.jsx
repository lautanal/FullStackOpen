const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}
const Content = (props) => {
  console.log(props)
  return (
    <>
    <Part content={props.parts[0].name} number={props.parts[0].exercises} />
    <Part content={props.parts[1].name} number={props.parts[1].exercises} />
    <Part content={props.parts[2].name} number={props.parts[2].exercises} />
    </>
  )
}
const Total = (props) => {
  console.log(props)
  return (
    <>
      <p>
      Number of exercises {props.total}
      </p>
    </>
  )
}
const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.content} {props.number}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </>
  )
}

export default App