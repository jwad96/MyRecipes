import {useState} from "react"
import {useSelector} from "react-redux"
import {useHistory} from "react-router";

import "./NoteForm.css"

export default function NoteForm({recipeId, setRecipeNotes}) {
    const [note, setNote] = useState("");
    const user = useSelector(state => state.session.user);

    const history = useHistory();

    const handleSignIn = e => {
        e.preventDefault();
        history.push("/login")
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            note: note,
            note_recipe_id: recipeId,
        }

        fetch(`/api/notes`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async res => {
            if (res.ok) {
                const newNote = await res.json();
                console.log(newNote);
                setRecipeNotes(notes => [...notes, newNote])
                setNote("")
            }
        })
    }

    return (
        <>
        <form id="note-form">
          <h3 id="note-form-header">Have a helpful note?</h3>
          {   user ? 
                <>
                  <textarea id="note-form-field" maxLength={250} value={note} onChange={e => setNote(e.target.value)}></textarea>
                  <button id="note-form-submit" onClick={handleSubmit}>Submit</button>
                </>
              :
                <p id="note-form-alt-message"><button id="note-form-sign-in" onClick={handleSignIn}>Sign in</button> to post!</p>
          }
        </form>
        </>
    )
}
