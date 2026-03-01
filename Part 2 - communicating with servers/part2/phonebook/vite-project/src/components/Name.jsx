const Name = ({ personName, personNumber, removeNumberHandler }) => {
  return (
    <>
      <li>{personName} - {personNumber} 
      <button onClick={removeNumberHandler}>delete</button> </li>
    </>
  )
}

export default Name