const Header = (props) => {
  console.log({props})
  return(
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Contents = (props) => {

  return(
    <>
      <Part part = {props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part = {props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part = {props.parts[2].name} exercise={props.parts[2].exercises}/>
    </>
  )
}

const Part = ({part,exercise}) => {
  return(
    <>
      <p> part = {part} , exercises = {exercise}</p>
    </>
  )
}

const Total = (props) => { 

  return(
    <>
      <p>Total Exercises = {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}



const App = () => {
  const course = {
    id: 1, 
    name: 'Half Stack Development 3',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }

    ]
  }
  
  { /*return (
    <div>
      <Header course = {course}/>
      <Contents parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  ) */ }

  return <Course course={course} />
}

export default App