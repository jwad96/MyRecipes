import {useState} from "react";
import Note from "./Note/Note"
import "./Notes.css"

export default function Notes({notes, setRecipeNotes}) {

  const handleDelete = (noteId) => {
    return () => {
      fetch(`/api/notes/${noteId}`, {
        method: "DELETE"
      }).then(res => {
        if (res.ok) {
          setRecipeNotes(recipeNotes => recipeNotes.filter(x => x.id !== noteId))
        }
      })
    }
  }

    return (
        <div id="notes">
            <ul>
                {
                  notes.map(({id, note, noteAuthorName, noteAuthorId}) => {
                    return (
                      <li key={id}>
                        <Note id={id} author={noteAuthorName} note={note} noteAuthorId={noteAuthorId} handleDelete={handleDelete}/>
                      </li>
                    )
                  })
                }
            </ul>
        </div>
    )
}
