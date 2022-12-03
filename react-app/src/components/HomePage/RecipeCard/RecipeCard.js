import {useHistory} from "react-router";

import "./RecipeCard.css"

export default function RecipeCard({title, authorName, previewImageURL, recipeId}) {
    const backgroundStyle = {backgroundImage: `url(${previewImageURL})`}

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
