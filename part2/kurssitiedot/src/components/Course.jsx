const Header = ({text}) => {
  console.log(text)
  return (
    <div>
      <h2>{text}</h2>
    </div>
  )
}
const Content = ({parts}) => {
  console.log(parts)
  return (
    <div>
      {parts.map(part => <Part key={part.id} content={part.name} number={part.exercises} />)}
    </div>
  )
}
const Part = ({content, number}) => {
  console.log(content)
  return (
    <div>
      <p>{content} {number}</p>
    </div>
  )
}
const Total = ({total}) => {
  console.log(total)
  return (
    <div>
      <p><strong>Number of exercises {total}</strong></p>
    </div>
  )
}
const Course = ({course}) => {
  console.log(course)
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.map(part => part.exercises).reduce((accumulator, value) => accumulator + value,0)} />
    </div>
  )
}

export default Course