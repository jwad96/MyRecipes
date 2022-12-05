import {useState} from "react";
import {useHistory} from "react-router";

import "./RecipeCard.css"

export default function RecipeCard({title, authorName, previewImageURL, recipeId}) {
    const [imageURL, setImageURL] = useState(previewImageURL);

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

    const history = useHistory()

    const handleClick = () => {
        history.push(`/recipes/${recipeId}`)
    }
    
    return (
        <li className="recipe-card" onClick={handleClick}>
            <div className="recipe-card-preview" style={backgroundStyle}></div>
            <p className="recipe-card-title">{title}</p>
            <p className="recipe-card-author">{authorName}</p>
        </li>
    )
}
