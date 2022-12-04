// TODO: CHANGE NAME TO SOMETHING OTHER THAN FORM


import {useState} from "react"
import {useSelector} from "react-redux"
import {useHistory, useLocation} from "react-router";

import "./NoteForm.css"

export default function NoteForm({recipeId}) {
    const [note, setNote] = useState("");
    const user = useSelector(state => state.session.user);

    const history = useHistory();
    const location = useLocation()

    const handleSignIn = e => {
        e.preventDefault();
        history.push(`/login?redirectTo=${location.pathname}`)
    }


    const handleHereClick = (e) => {
        history.push(`/recipes/${recipeId}/notes/new`)
    }

    return (
        <>
        <div id="note-form">
          <h3 id="note-form-header">Have a helpful note?</h3>
          {   user ? 
                <h3 id="note-form-alt-message">Submit it <button id="note-form-sign-in" onClick={handleHereClick}>Here</button></h3>
              :
                <h3 id="note-form-alt-message"><button id="note-form-sign-in" onClick={handleSignIn}>Sign in</button> to post!</h3>
          }
        </div>
        </>
    )
}
