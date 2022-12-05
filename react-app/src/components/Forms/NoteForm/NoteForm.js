import {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router"

import "./NoteForm.css"

export default function NoteForm({edit}) {
    const [note, setNote] = useState("")

    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        const populate = async () => {
            const note = await fetch(`/api/notes/${params.noteId}`).then(res => res.json())
            if (note.note) {
                setNote(note.note)
            }
        }
        
        if (edit){
            populate()
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const method = edit ? "PUT" : "POST"
        const url = edit ? `/api/notes/${params.noteId}` : "/api/notes"

        const body = {
            note_recipe_id: params.recipeId,
            note
        }
        
        if (note.length > 0) {
            fetch(url, {
                method,
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => history.push(`/recipes/${params.recipeId}`))
        }
    }

    return (
        <div id="note-form-wrapper">
          {edit ? <h1 id="note-form-header">Edit your note</h1> : <h1 id="note-form-header">Submit your note</h1>}
          <div id="note-form-counter" className={note.length > 0 ? "green" : "red"}>{`${note.length} / 1000 ${note.length ? '' : " -- field cannot be empty"}`}</div>
          <form id="note-form-2" onSubmit={handleSubmit}>
              <textarea id="note-form-2-note" maxLength={1000} value={note} onChange={e=>setNote(e.target.value)}/>
              <button id="note-form-2-submit">Submit</button>
          </form>
        </div>
    )
}
