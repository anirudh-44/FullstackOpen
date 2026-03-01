const Header = ({name1}) => {
    //console.log(name1)
    return(
        <>
            <h1>{name1}</h1>
        </>
    )
}

const Content = ({parts}) => {
    //console.log(parts)
    return(
        <>
            {
                parts.map(part2 => (
                    <Part key={part2.id} part1={part2} />
                ))
            }
        </>
    )
}

const Part = ({part1}) => {
  return(
    <>
      <p> part = {part1.name} , exercises = {part1.exercises}</p>
    </>
  )
}

const Totals = ({parts}) => {
    /*const totalEx = parts.reduce(function(acc,curr){
        acc = acc + curr.exercises;
        return acc;
    },0) 
    */
   // OR
    /*const totalEx = parts.reduce((acc,curr) => {
        return acc + curr.exercises},0) */
    // OR
    const totalEx = parts.reduce((acc,curr) => 
        acc + curr.exercises,0)
    return(
        <>
            <p>Total of {totalEx} exercises</p>
        </>
    )
}

const Course = ({course1}) => {
    return(
        <>
            <Header name1 = {course1.name}/>
            <Content parts = {course1.parts}/>
            <Totals parts = {course1.parts}/>
        </>
    )
}

export default Course