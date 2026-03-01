import { useState, useEffect } from 'react'
import Note from './components/Notes'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'



const App = () => {
  
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  /*const hook = () => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }

  useEffect(hook, [])*/

  useEffect(() =>{
    noteService.getAll()  
               .then(initialNotes => {
                setNotes(initialNotes)
               })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      //id: String(notes.length + 1), // let the server create IDs for our resources
    }

    //setNotes(notes.concat(noteObject))
    /*axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
      setNotes(notes.concat(response.data))  // optimal way is setNotes(prevNotes => prevNotes.concat(response.data))
      setNewNote('')
    })*/

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))  // optimal way is setNotes(prevNotes => prevNotes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    //console.log (`importance of ${id} needs to be toggled`)
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    /*axios.put(url, changedNote).then(response => {
      setNotes(notes.map( n => n.id === id ? response.data : n))
    })*/

    noteService.update(id, changedNote) 
               .then(returnedNote => {
                  setNotes(notes.map( n => n.id === id ? returnedNote : n))
               })
               .catch(error => {
                  /*
                  alert(
                    `the note '${note.content}' was already deleted from server`
                  )
                  setNotes(notes.filter(note => note.id !== id))
                  */
                 setErrorMessage(
                  `Note '${note.content}' was already removed from server`
                 )
                 setTimeout(() => {
                  setErrorMessage(null)
                 }, 5000)
                 setNotes(notes.filter(n => n.id !==id))
               })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App 