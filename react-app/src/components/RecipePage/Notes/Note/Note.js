import {useSelector} from "react-redux";
import "./Note.css"

export default function Note({id, author, note, noteAuthorId, handleDelete}) {
    const userId = useSelector(state => state.session.user)?.id;



    return (
        <div className="note">
            <div className="note-author-wrapper">
              {
                userId == noteAuthorId && 
                <i onClick={handleDelete(id)} className="note-trash fa-solid fa-trash-can"></i>
              }
              <div className="note-author">{author}</div>
            </div>
            <div className="note-note">{note}</div>
        </div>
    )
}
