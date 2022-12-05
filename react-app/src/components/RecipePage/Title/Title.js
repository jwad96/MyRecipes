import {useState} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router";
import "./Title.css"

export default function Title({id, title, image, author, authorId, description}) {
    const [imageURL, setImageURL] = useState(image);

    const user = useSelector(state => state.session.user)
    const history = useHistory();

    const img = new Image();
    img.onload = function() {
        if (this.width > 0) {
            return;
        }
    }
    img.onerror = function() {
        setImageURL("https://images.unsplash.com/photo-1631898040032-da1a5a87d13b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")
    }

    img.src = imageURL;

    const backgroundStyle = {backgroundImage: `url(${imageURL})`}

    const handleEdit = () => {
        history.push(`/recipes/${id}/edit`)
    }

    const handleDelete = () => {
        fetch(`/api/recipes/${id}`, {
            method: "DELETE",
        })
        .then(res => {
            if (res.ok) {
                history.push("/");
            }
        })
    }

    const renderControls = user && user.id == authorId

    console.log("renderControls", renderControls)
    console.log("user", user)
    console.log("authorId", authorId)

    return (
        <div id="title-container">
            <div id="title-title-container">
              {
                renderControls && 
                <>
                  <button id="title-edit" onClick={handleEdit}>EDIT</button>
                  <button id="title-delete" onClick={handleDelete}>DELETE</button>
                </>
              }
              <div id="title-title">{title}</div>
              <div id="title-author">by {author}</div>
            </div>
            <div id="title-image" style={backgroundStyle} />
            <p id="title-description">{description}</p>
        </div>
    )
}
