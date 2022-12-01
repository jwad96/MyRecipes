import "./RecipeCard.css"

export default function RecipeCard({title, authorName, previewImageURL}) {
    const backgroundStyle = {"backgroundImage": `url(${previewImageURL})`}
    console.log(title, authorName, previewImageURL)

    return (
        <li className="recipe-card">
            <div className="recipe-card-preview" style={backgroundStyle}></div>
            <p className="recipe-card-title">{title}</p>
            <p className="recipe-card-author">{authorName}</p>
        </li>
    )
}
