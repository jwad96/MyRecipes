import {useSelector} from "react-redux";
import {useHistory} from "react-router";
import "./Note.css"

export default function Note({id, author, note, noteAuthorId, noteRecipeId, handleDelete}) {
    const userId = useSelector(state => state.session.user)?.id;
    const history = useHistory();

    const handleEdit = () => {
      history.push(`/recipes/${noteRecipeId}/notes/${id}/edit`)
    }

    return (
        <div className="note">
            <div className="note-author-wrapper">
              {
                userId == noteAuthorId && 
                <div className="note-icons">
                  <i onClick={handleDelete(id)} className="note-trash fa-solid fa-trash-can"></i>
                  <i onClick={handleEdit} className="note-edit fa-solid fa-pen-to-square"></i>
                </div>
              }
              <div className="note-author">{author}</div>
            </div>
            <div className="note-note">{note}</div>
        </div>
    )
}
