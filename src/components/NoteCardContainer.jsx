
import NoteCard from "./NoteCard"

const NoteCardContainer = ({notes}) => {
  return (
    <div className="container">
    <div className="note-has-grid row">

      {
        notes.length > 0 ? notes.map(note =><NoteCard note={note} key={note.id} /> ) : (<h1> No notes found.</h1>)
      }
      
      
    </div>
    </div>
  )
}

export default NoteCardContainer
