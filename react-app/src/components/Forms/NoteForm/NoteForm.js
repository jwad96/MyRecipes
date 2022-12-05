import {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router"
import {useSelector} from "react-redux";

import "./NoteForm.css"

export default function NoteForm({edit}) {
    const [note, setNote] = useState("")
    const [recipeExists, setRecipeExists] = useState(false)
    const [noteExists, setNoteExists] = useState(false)
    const [ownNote, setOwnNote] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    

    const params = useParams();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        console.log("HELLO?");
        const populate = async () => {
            const note = await fetch(`/api/notes/${params.noteId}`).then(res => res.json())
            if (note.note) {
                setNote(note.note)
                setNoteExists(true)
            }

            if (note.noteAuthorId == user?.id) {
                setOwnNote(true);
            }
        }

        const findRecipe = async () => {
            console.log("SHIT FUCK");
            const recipe = await fetch(`/api/recipes/${params.recipeId}`).then(res => res.json())
            console.log(recipe);
            if (recipe.id) {
                console.log("HEY");
                setRecipeExists(true);
            }
        }

        findRecipe().then(() => setIsLoaded(true));
        
        if (edit){
            populate()
        }
    }, [user])

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


    if (!user) {
        return isLoaded && <h1 id="recipe-form-error-header">{`Must be logged in to ${edit ? "edit" : "post"} note`}</h1>
    }
    
    if (edit && !noteExists) {
        return isLoaded && <h1 id="recipe-form-error-header">Cannot edit a note that doesn't exist</h1>
    }

    if (!recipeExists) {
        return isLoaded && <h1 id="recipe-form-error-header">Recipe does not exist</h1>
    }
    
    if (edit && !ownNote) {
        return isLoaded && <h1 id="recipe-form-error-header">Must be your own note to edit</h1>
    }

    return isLoaded && (
        
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
