const Header = ({course}) => {
  console.log(course)
  return (
    <div>
      <h1>
        {course}
      </h1>
    </div>
  )
}
const Content = ({parts}) => {
  console.log(parts)
  return (
    <div>
    <Part content={parts[0].name} number={parts[0].exercises} />
    <Part content={parts[1].name} number={parts[1].exercises} />
    <Part content={parts[2].name} number={parts[2].exercises} />
    </div>
  )
}
const Total = ({total}) => {
  console.log(total)
  return (
    <div>
      <p>
      Number of exercises {total}
      </p>
    </div>
  )
}
const Part = ({content, number}) => {
  console.log(content)
  return (
    <div>
      <p>
        {content} {number}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

export default App